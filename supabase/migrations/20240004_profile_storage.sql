-- =============================================================================
-- DRIPLENS — Storage Setup for Profile Images
-- Migration: 20240004_profile_storage.sql
-- =============================================================================

-- 1. Note for the developer:
-- Create the 'profiles' bucket in the Supabase Dashboard or via CLI:
--   supabase storage create profiles --public
-- =============================================================================

-- 2. Storage RLS Policies for 'profiles' bucket
-- Bucket name: profiles
-- Path format: images/{user_uuid}/{type}_{file_uuid}.{ext}
-- =============================================================================

-- Public read — anyone can view avatars and banners.
create policy "storage profiles: public read"
  on storage.objects
  for select
  using (bucket_id = 'profiles');

-- Authenticated users can upload to their own images folder.
create policy "storage profiles: owner upload"
  on storage.objects
  for insert
  with check (
    bucket_id = 'profiles'
    and auth.role() = 'authenticated'
    and (storage.foldername(name))[1] = 'images'
    and (storage.foldername(name))[2] = auth.uid()::text
  );

-- Owners can delete their own objects.
create policy "storage profiles: owner delete"
  on storage.objects
  for delete
  using (
    bucket_id = 'profiles'
    and auth.uid()::text = (storage.foldername(name))[2]
  );
