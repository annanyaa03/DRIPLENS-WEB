-- =============================================================================
-- DRIPLENS — Initial Schema
-- Migration: 20240001_initial_schema.sql
--
-- Run order: apply this file first, then 20240002_rls_policies.sql
--
-- Supabase project setup:
--   supabase db push           (local dev via Supabase CLI)
--   supabase db push --linked  (push to hosted project)
--
-- Or paste directly into the Supabase SQL editor.
-- =============================================================================


-- ---------------------------------------------------------------------------
-- 0. Extensions
-- ---------------------------------------------------------------------------
create extension if not exists "uuid-ossp";   -- uuid_generate_v4()
create extension if not exists "pgcrypto";    -- gen_random_uuid() (pg 13+)


-- ---------------------------------------------------------------------------
-- 1. Custom types / enums
-- ---------------------------------------------------------------------------

-- Role assigned at registration; stored in auth.users.user_metadata AND profiles
create type public.user_role as enum ('creator', 'brand');

-- Lifecycle of a hiring request
create type public.hiring_status as enum (
  'Pending',    -- brand posted, awaiting creator response
  'Accepted',   -- creator accepted → messaging unlocked
  'Declined',   -- creator declined
  'Review',     -- creator flagged for brand review
  'Completed'   -- brand marked as done
);

-- Portfolio item media kind
create type public.media_type as enum ('image', 'video');


-- ---------------------------------------------------------------------------
-- 2. profiles
--    One row per auth.users entry; synced via trigger on auth.users INSERT.
--    Stores both creator and brand public data in one table (role column
--    differentiates).
-- ---------------------------------------------------------------------------
create table public.profiles (
  id            uuid          primary key references auth.users(id) on delete cascade,
  username      text          not null unique,
  role          user_role     not null,

  -- Shared display fields
  bio           text          check (char_length(bio) <= 500),
  avatar_url    text,
  banner_url    text,

  -- Creator-specific fields (null for brands)
  location      text          check (char_length(location) <= 100),
  category      text          check (char_length(category) <= 50),

  created_at    timestamptz   not null default now(),
  updated_at    timestamptz   not null default now()
);

comment on table  public.profiles              is 'Public profile for every user (creator or brand).';
comment on column public.profiles.role         is 'creator | brand — set at registration, immutable.';
comment on column public.profiles.category     is 'Creator primary skill category (e.g. Videographer, Brand Identity).';


-- ---------------------------------------------------------------------------
-- 3. portfolio_items
--    Media uploaded by creators to showcase their work.
-- ---------------------------------------------------------------------------
create table public.portfolio_items (
  id            uuid          primary key default gen_random_uuid(),
  creator_id    uuid          not null references public.profiles(id) on delete cascade,

  title         text          not null check (char_length(title) between 1 and 100),
  description   text          check (char_length(description) <= 500),
  category      text          not null check (char_length(category) between 1 and 50),

  media_url     text          not null,   -- public CDN URL (Supabase Storage)
  media_type    media_type    not null,
  storage_path  text          not null,   -- internal bucket path for deletion

  created_at    timestamptz   not null default now()
);

comment on table  public.portfolio_items              is 'Creator portfolio — images and videos uploaded to Supabase Storage.';
comment on column public.portfolio_items.storage_path is 'Bucket-relative path used for storage.remove(); never exposed to clients.';


-- ---------------------------------------------------------------------------
-- 4. hiring_requests
--    A brand posts a brief (optionally targeting a specific creator).
--    Status transitions are role-gated in application code (hiringService.js).
-- ---------------------------------------------------------------------------
create table public.hiring_requests (
  id                  uuid            primary key default gen_random_uuid(),
  brand_id            uuid            not null references public.profiles(id) on delete cascade,
  creator_id          uuid            references public.profiles(id) on delete set null,
                                      -- nullable → open brief visible to all creators

  project_title       text            not null check (char_length(project_title) between 3 and 100),
  project_description text            not null check (char_length(project_description) between 10 and 2000),
  budget              numeric(12, 2)  not null check (budget > 0 and budget <= 1000000),

  status              hiring_status   not null default 'Pending',

  created_at          timestamptz     not null default now(),
  updated_at          timestamptz     not null default now(),

  -- A brand cannot send duplicate active requests to the same creator for the
  -- same project title (prevents spam).
  constraint uq_active_request unique (brand_id, creator_id, project_title)
);

comment on table  public.hiring_requests             is 'Briefs posted by brands; optionally directed at a specific creator.';
comment on column public.hiring_requests.creator_id  is 'NULL = open brief. Non-null = targeted at a specific creator.';
comment on column public.hiring_requests.budget      is 'USD amount. Validated 0–1,000,000.';


-- ---------------------------------------------------------------------------
-- 5. messages
--    Chat between brand and creator within an accepted (or any) hiring request.
--    Realtime is enabled via Supabase Realtime on this table.
-- ---------------------------------------------------------------------------
create table public.messages (
  id                  uuid          primary key default gen_random_uuid(),
  hiring_request_id   uuid          not null references public.hiring_requests(id) on delete cascade,
  sender_id           uuid          not null references public.profiles(id) on delete cascade,

  content             text          not null check (char_length(content) between 1 and 5000),
  is_read             boolean       not null default false,

  created_at          timestamptz   not null default now()
);

comment on table  public.messages                     is 'Chat messages scoped to a hiring request. Realtime INSERT subscription enabled.';
comment on column public.messages.is_read             is 'Flipped to true by markRead() when the recipient opens the conversation.';
comment on column public.messages.hiring_request_id   is 'Cascade-deletes messages if the parent request is deleted.';


-- ---------------------------------------------------------------------------
-- 6. Indexes
--    Cover the query patterns in the application services.
-- ---------------------------------------------------------------------------

-- profiles
create index idx_profiles_role         on public.profiles(role);
create index idx_profiles_category     on public.profiles(category) where role = 'creator';
create index idx_profiles_location     on public.profiles(location) where role = 'creator';
create index idx_profiles_username_gin on public.profiles using gin(username gin_trgm_ops)
  where exists (select 1 from pg_extension where extname = 'pg_trgm');
  -- Enables fast ILIKE '%search%' used in creatorService.listCreators
  -- (pg_trgm is available on Supabase by default)

-- portfolio_items
create index idx_portfolio_creator_id  on public.portfolio_items(creator_id);
create index idx_portfolio_created_at  on public.portfolio_items(created_at desc);

-- hiring_requests
create index idx_hiring_brand_id       on public.hiring_requests(brand_id);
create index idx_hiring_creator_id     on public.hiring_requests(creator_id);
create index idx_hiring_status         on public.hiring_requests(status);
create index idx_hiring_created_at     on public.hiring_requests(created_at desc);
-- Composite — the most common query: all requests for a user (brand OR creator)
create index idx_hiring_parties        on public.hiring_requests(brand_id, creator_id);

-- messages
create index idx_messages_request_id   on public.messages(hiring_request_id);
create index idx_messages_sender_id    on public.messages(sender_id);
create index idx_messages_created_at   on public.messages(hiring_request_id, created_at asc);
-- Unread count query
create index idx_messages_unread       on public.messages(hiring_request_id, is_read)
  where is_read = false;


-- ---------------------------------------------------------------------------
-- 7. updated_at auto-maintenance trigger
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger trg_hiring_updated_at
  before update on public.hiring_requests
  for each row execute function public.set_updated_at();


-- ---------------------------------------------------------------------------
-- 8. Auto-create profile on auth.users INSERT
--    Supabase creates the auth.users row; this trigger mirrors the relevant
--    metadata into public.profiles so we never have to do it manually.
-- ---------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer          -- runs as postgres, not as the calling user
set search_path = public
as $$
begin
  insert into public.profiles (id, username, role)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    (new.raw_user_meta_data->>'role')::user_role
  )
  on conflict (id) do nothing;   -- idempotent — safe to re-run
  return new;
end;
$$;

create trigger trg_on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- ---------------------------------------------------------------------------
-- 9. Supabase Storage buckets
--    Defined here for documentation; apply via Supabase dashboard or CLI.
--
--    supabase storage create portfolio-media --public
-- ---------------------------------------------------------------------------

-- Bucket: portfolio-media
--   Visibility : PUBLIC  (URLs are served without a signed token)
--   Max size   : 50 MB per object  (enforced in uploadService.js)
--   MIME allow : image/jpeg, image/png, image/webp, image/gif,
--                video/mp4, video/quicktime, video/webm
--   Path format: portfolio/{creator_uuid}/{file_uuid}.{ext}
--
-- NOTE: Storage bucket RLS is defined in 20240002_rls_policies.sql


-- ---------------------------------------------------------------------------
-- 10. Realtime publication
--     Enables the Supabase JS client's .channel() subscription used in
--     MessagingPage.jsx for live message delivery.
-- ---------------------------------------------------------------------------
alter publication supabase_realtime add table public.messages;

-- Optional: also publish hiring_requests so dashboards can live-update
-- status badges without polling.
alter publication supabase_realtime add table public.hiring_requests;


-- =============================================================================
-- Schema complete.
-- Apply RLS policies next: 20240002_rls_policies.sql
-- =============================================================================
