-- =============================================================================
-- DRIPLENS — Onboarding & Display Fields
-- Migration: 20240006_onboarding_fields.sql
-- =============================================================================

alter table public.profiles
  add column if not exists display_name       text,
  add column if not exists tagline            text,
  add column if not exists primary_platform   text,
  add column if not exists audience_tier      text,
  add column if not exists qualifications     text[]         default '{}',
  add column if not exists past_work          text[]         default '{}',
  add column if not exists preferred_work_type text[]         default '{}',
  add column if not exists onboarding_complete boolean        default false;

-- Sync display_name with username if it's null
update public.profiles set display_name = username where display_name is null;

create index if not exists idx_profiles_onboarding
  on public.profiles(onboarding_complete) where role = 'creator';
