-- Add columns to profiles to support advanced filtering
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS min_budget numeric(12, 2) DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS max_budget numeric(12, 2) DEFAULT 10000;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS follower_count integer DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS platforms text[] DEFAULT '{}';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_available boolean DEFAULT true;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS rating numeric(3, 2) DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';

-- Add indexes for performance
CREATE INDEX IF NOT EXISTS idx_profiles_budget ON public.profiles(min_budget, max_budget) WHERE role = 'creator';
CREATE INDEX IF NOT EXISTS idx_profiles_follower_count ON public.profiles(follower_count) WHERE role = 'creator';
CREATE INDEX IF NOT EXISTS idx_profiles_availability ON public.profiles(is_available) WHERE role = 'creator';
CREATE INDEX IF NOT EXISTS idx_profiles_rating ON public.profiles(rating) WHERE role = 'creator';
