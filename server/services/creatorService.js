import { supabase } from '../utils/supabase.js';
import { notFound } from '../utils/AppError.js';

const FOLLOWER_TIERS = {
  Nano:  [0, 10000],
  Micro: [10000, 50000],
  Mid:   [50000, 500000],
  Macro: [500000, 1000000],
  Mega:  [1000000, 1000000000],
};

export const listCreators = async ({ 
  category, location, search, minBudget, maxBudget, 
  followerTier, platforms, isAvailable, minRating, tags, 
  page, limit 
}) => {
  const from = (page - 1) * limit;
  const to   = from + limit - 1;

  let query = supabase
    .from('profiles')
    .select('id, username, bio, location, category, avatar_url, min_budget, max_budget, follower_count, platforms, is_available, rating, tags', { count: 'exact' })
    .eq('role', 'creator');

  if (category) {
    const cats = category.split(',');
    const orQuery = cats.map(c => `category.ilike.%${c}%`).join(',');
    query = query.or(orQuery);
  }
  
  if (location) query = query.ilike('location', `%${location}%`);
  
  if (search) {
    // Multi-field search using OR
    query = query.or(`username.ilike.%${search}%,bio.ilike.%${search}%,location.ilike.%${search}%,category.ilike.%${search}%`);
  }

  if (minBudget !== undefined) query = query.gte('max_budget', minBudget);
  if (maxBudget !== undefined) query = query.lte('min_budget', maxBudget);
  
  if (followerTier && followerTier !== 'Any') {
    const range = FOLLOWER_TIERS[followerTier];
    if (range) {
      query = query.gte('follower_count', range[0]).lte('follower_count', range[1]);
    }
  }

  if (platforms) {
    const pList = platforms.split(',');
    query = query.contains('platforms', pList);
  }

  if (isAvailable !== undefined) query = query.eq('is_available', isAvailable);
  if (minRating !== undefined) query = query.gte('rating', minRating);
  
  if (tags) {
    const tagList = tags.split(',');
    query = query.overlaps('tags', tagList);
  }

  const { data, error, count } = await query
    .order('rating', { ascending: false })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;

  return {
    creators:   data,
    pagination: { page, limit, total: count, totalPages: Math.ceil(count / limit) }
  };
};

export const getCreator = async (id) => {
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      id, username, bio, location, category, avatar_url, banner_url, instagram, twitter, website, created_at,
      portfolio_items (id, title, media_url, media_type, created_at)
    `)
    .eq('id', id)
    .single();

  if (error || !data) throw notFound('Creator not found');
  return data;
};

export const updateProfile = async (userId, fields) => {
  const { data, error } = await supabase
    .from('profiles')
    .update(fields)
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};
