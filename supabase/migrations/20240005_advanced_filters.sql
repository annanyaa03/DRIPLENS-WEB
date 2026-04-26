-- =============================================================================
-- DRIPLENS — Advanced Filter Columns
-- Migration: 20240005_advanced_filters.sql
-- =============================================================================

alter table public.profiles
  add column if not exists min_budget     numeric(12, 2) default 0,
  add column if not exists max_budget     numeric(12, 2) default 10000,
  add column if not exists follower_count integer        default 0,
  add column if not exists platforms      text[]         default '{}',
  add column if not exists is_available   boolean        default true,
  add column if not exists rating         numeric(3, 2)  default 0,
  add column if not exists tags           text[]         default '{}';

create index if not exists idx_profiles_budget
  on public.profiles(min_budget, max_budget) where role = 'creator';

create index if not exists idx_profiles_follower_count
  on public.profiles(follower_count) where role = 'creator';

create index if not exists idx_profiles_availability
  on public.profiles(is_available) where role = 'creator';

create index if not exists idx_profiles_rating
  on public.profiles(rating) where role = 'creator';
