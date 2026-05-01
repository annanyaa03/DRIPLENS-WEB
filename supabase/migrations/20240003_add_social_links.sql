-- =============================================================================
-- DRIPLENS — Add Social Links to Profiles
-- Migration: 20240003_add_social_links.sql
-- =============================================================================

alter table public.profiles
  add column if not exists instagram text check (char_length(instagram) <= 50),
  add column if not exists twitter   text check (char_length(twitter)   <= 50),
  add column if not exists website   text check (char_length(website)   <= 255);

comment on column public.profiles.instagram is 'Instagram handle (without @).';
comment on column public.profiles.twitter   is 'Twitter/X handle (without @).';
comment on column public.profiles.website   is 'Public portfolio or brand website URL.';
