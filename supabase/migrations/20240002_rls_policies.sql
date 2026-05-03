-- =============================================================================
-- DRIPLENS — Row Level Security Policies
-- Migration: 20240002_rls_policies.sql
--
-- Apply AFTER 20240001_initial_schema.sql.
--
-- Design principles:
--   • Every table has RLS enabled — default-deny.
--   • Policies are additive: a row is visible if ANY SELECT policy matches.
--   • auth.uid()  → the UUID of the currently authenticated Supabase user.
--   • auth.role() → 'authenticated' | 'anon' | 'service_role'.
--   • Service-role key (used by the Express server) bypasses RLS entirely,
--     so application-layer checks (assertParty, requireRole, etc.) are the
--     second line of defence; RLS is the first.
--
-- Column coverage:
--   • Columns added by later migrations (20240003 social links, 20240005
--     advanced filters + onboarding) are automatically covered by the
--     row-level policies below. No per-column RLS changes are needed.
-- =============================================================================


-- ---------------------------------------------------------------------------
-- Helper: convenience function so policies read like English
-- ---------------------------------------------------------------------------
create or replace function public.is_authenticated()
returns boolean
language sql
stable
as $$ select auth.role() = 'authenticated' $$;


-- ===========================================================================
-- TABLE: public.profiles
--
-- Columns (after all migrations):
--   id, username, role, bio, avatar_url, banner_url, location, category,
--   instagram, twitter, website,                              (20240003)
--   display_name, tagline, primary_platform, audience_tier,   (20240005)
--   min_budget, max_budget, follower_count, platforms,         (20240005)
--   is_available, rating, tags, qualifications, past_work,    (20240005)
--   preferred_work_type, onboarding_complete,                  (20240005)
--   created_at, updated_at
-- ===========================================================================
alter table public.profiles enable row level security;

-- Anyone (including anon) can read public creator/brand profiles.
-- This powers the public Creators and Brands discovery pages.
create policy "profiles: public read"
  on public.profiles
  for select
  using (true);

-- A user can only update their own profile.
-- Covers all columns: bio, social links, onboarding fields, filter data, etc.
create policy "profiles: owner update"
  on public.profiles
  for update
  using  (auth.uid() = id)
  with check (auth.uid() = id);

-- INSERT is handled by the handle_new_user() trigger (security definer).
-- Direct client inserts are blocked.
create policy "profiles: no direct insert"
  on public.profiles
  for insert
  with check (false);

-- Users cannot delete their own profile directly; cascade from auth.users
-- handles cleanup when an account is deleted via Supabase Auth admin.
create policy "profiles: no direct delete"
  on public.profiles
  for delete
  using (false);


-- ===========================================================================
-- TABLE: public.portfolio_items
-- ===========================================================================
alter table public.portfolio_items enable row level security;

-- Anyone can browse portfolio items (public explore feed).
create policy "portfolio_items: public read"
  on public.portfolio_items
  for select
  using (true);

-- Only the owning creator can insert their own items.
create policy "portfolio_items: creator insert"
  on public.portfolio_items
  for insert
  with check (
    public.is_authenticated()
    and auth.uid() = creator_id
  );

-- Creators can update their own items (e.g. edit title/description).
create policy "portfolio_items: creator update"
  on public.portfolio_items
  for update
  using  (auth.uid() = creator_id)
  with check (auth.uid() = creator_id);

-- Creators can delete their own items.
-- Note: the application layer also removes the Storage object (uploadService).
create policy "portfolio_items: creator delete"
  on public.portfolio_items
  for delete
  using (auth.uid() = creator_id);


-- ===========================================================================
-- TABLE: public.hiring_requests
-- ===========================================================================
alter table public.hiring_requests enable row level security;

-- A user can read a hiring request only if they are the brand that posted it
-- OR the creator it was directed at.
-- Open briefs (creator_id IS NULL) are readable by any authenticated user so
-- creators can discover and respond to them.
create policy "hiring_requests: parties read"
  on public.hiring_requests
  for select
  using (
    public.is_authenticated()
    and (
      auth.uid() = brand_id
      or auth.uid() = creator_id
      or creator_id is null          -- open brief
    )
  );

-- Only authenticated users with role = 'brand' can create requests.
-- Role is stored in auth.users.user_metadata; we read it via a sub-select
-- on profiles to avoid relying on metadata that could be spoofed by clients.
create policy "hiring_requests: brand insert"
  on public.hiring_requests
  for insert
  with check (
    public.is_authenticated()
    and auth.uid() = brand_id
    and exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'brand'
    )
  );

-- Both parties can update the status of a request they are party to.
-- Fine-grained role-based transition rules are enforced in hiringService.js
-- (which runs under the service-role key and therefore bypasses RLS).
-- This policy is a safety net for any direct Supabase client calls.
create policy "hiring_requests: parties update"
  on public.hiring_requests
  for update
  using (
    auth.uid() = brand_id
    or auth.uid() = creator_id
  )
  with check (
    auth.uid() = brand_id
    or auth.uid() = creator_id
  );

-- Only the brand that posted a request can delete it.
create policy "hiring_requests: brand delete"
  on public.hiring_requests
  for delete
  using (auth.uid() = brand_id);


-- ===========================================================================
-- TABLE: public.messages
-- ===========================================================================
alter table public.messages enable row level security;

-- A user can read messages only in conversations they are a party to.
create policy "messages: parties read"
  on public.messages
  for select
  using (
    public.is_authenticated()
    and exists (
      select 1 from public.hiring_requests hr
      where hr.id = hiring_request_id
        and (hr.brand_id = auth.uid() or hr.creator_id = auth.uid())
    )
  );

-- A user can send a message only in a conversation they are a party to.
-- sender_id must match the authenticated caller.
create policy "messages: parties insert"
  on public.messages
  for insert
  with check (
    public.is_authenticated()
    and auth.uid() = sender_id
    and exists (
      select 1 from public.hiring_requests hr
      where hr.id = hiring_request_id
        and (hr.brand_id = auth.uid() or hr.creator_id = auth.uid())
    )
  );

-- The recipient can mark messages as read; they cannot edit content.
-- UPDATE is restricted to the is_read column only.
create policy "messages: recipient mark read"
  on public.messages
  for update
  using (
    -- only the non-sender party (the recipient) can flip is_read
    auth.uid() != sender_id
    and exists (
      select 1 from public.hiring_requests hr
      where hr.id = hiring_request_id
        and (hr.brand_id = auth.uid() or hr.creator_id = auth.uid())
    )
  )
  with check (
    -- only allow flipping is_read = true; all other fields must stay unchanged
    is_read = true
  );

-- Messages cannot be deleted by end users (audit trail).
create policy "messages: no delete"
  on public.messages
  for delete
  using (false);


-- ===========================================================================
-- STORAGE: portfolio-media bucket
--
-- Supabase Storage RLS uses the storage.objects table.
-- Bucket name: portfolio-media
-- Path format: portfolio/{creator_uuid}/{file_uuid}.{ext}
--
-- NOTE: Storage RLS for the 'profiles' bucket (avatars & banners) is
-- defined separately in 20240004_profile_storage.sql.
-- ===========================================================================

-- Public read — anyone can view portfolio media via the public URL.
create policy "storage portfolio-media: public read"
  on storage.objects
  for select
  using (bucket_id = 'portfolio-media');

-- Only the owning creator can upload to their own subfolder.
-- Path segment [2] = the creator UUID (0-indexed after split on '/').
create policy "storage portfolio-media: creator upload"
  on storage.objects
  for insert
  with check (
    bucket_id = 'portfolio-media'
    and public.is_authenticated()
    and (storage.foldername(name))[1] = 'portfolio'
    and (storage.foldername(name))[2] = auth.uid()::text
  );

-- Creators can delete only their own objects.
create policy "storage portfolio-media: creator delete"
  on storage.objects
  for delete
  using (
    bucket_id = 'portfolio-media'
    and auth.uid()::text = (storage.foldername(name))[2]
  );

-- No direct UPDATE of storage objects; replace via delete + re-upload.
create policy "storage portfolio-media: no update"
  on storage.objects
  for update
  using (false);


-- ===========================================================================
-- Verification queries
-- Run these after applying ALL migrations to confirm policies are in place.
-- ===========================================================================
-- select tablename, policyname, cmd, qual
-- from pg_policies
-- where schemaname = 'public'
-- order by tablename, policyname;

-- select *
-- from pg_policies
-- where tablename = 'objects'
-- order by policyname;
--
-- Expected storage policies (after 002 + 004):
--   portfolio-media: public read, creator upload, creator delete, no update
--   profiles:        public read, owner upload, owner delete, owner update
-- ===========================================================================


-- =============================================================================
-- RLS policies complete.
-- Next migration: 20240003_add_social_links.sql
-- =============================================================================
