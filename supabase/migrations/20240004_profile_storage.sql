-- =============================================================================
-- DRIPLENS — Storage Setup for Profile Images
-- Migration: 20240004_profile_storage.sql
--
-- Apply AFTER 20240003_add_social_links.sql.
--
-- Sets up RLS policies for the 'profiles' storage bucket used by:
--   • uploadService.uploadProfileImage()  — server/services/uploadService.js
--   • v1/upload.js  POST /avatar and POST /banner endpoints
--   • OnboardingPage.jsx  avatar upload during onboarding
-- =============================================================================


-- ---------------------------------------------------------------------------
-- 1. Bucket creation note
-- ---------------------------------------------------------------------------
-- Create the 'profiles' bucket in Supabase Dashboard or via CLI:
--
--   supabase storage create profiles --public
--
-- Visibility : PUBLIC   (avatar/banner URLs served without signed tokens)
-- Max size   : 5 MB     (enforced in uploadService.validateFile)
-- MIME allow : image/jpeg, image/png, image/webp, image/gif
-- Path format: images/{user_uuid}/{type}_{file_uuid}.{ext}
--   where type = 'avatar' or 'banner'


-- ---------------------------------------------------------------------------
-- 2. Storage RLS Policies for 'profiles' bucket
-- ---------------------------------------------------------------------------

-- Public read — anyone can view avatars and banners.
create policy "storage profiles: public read"
  on storage.objects
  for select
  using (bucket_id = 'profiles');

-- Authenticated users can upload to their own images folder.
-- Path: images/{user_uuid}/{type}_{file_uuid}.{ext}
create policy "storage profiles: owner upload"
  on storage.objects
  for insert
  with check (
    bucket_id = 'profiles'
    and auth.role() = 'authenticated'
    and (storage.foldername(name))[1] = 'images'
    and (storage.foldername(name))[2] = auth.uid()::text
  );

-- Owners can replace their existing avatar/banner via upsert.
-- uploadService uses { upsert: true } for profile images so the old object
-- is overwritten instead of requiring a delete + re-upload cycle.
create policy "storage profiles: owner update"
  on storage.objects
  for update
  using (
    bucket_id = 'profiles'
    and auth.uid()::text = (storage.foldername(name))[2]
  );

-- Owners can delete their own objects (e.g. remove old avatar).
create policy "storage profiles: owner delete"
  on storage.objects
  for delete
  using (
    bucket_id = 'profiles'
    and auth.uid()::text = (storage.foldername(name))[2]
  );


-- =============================================================================
-- Storage RLS complete.
-- Next migration: 20240005_advanced_filters.sql
-- =============================================================================
