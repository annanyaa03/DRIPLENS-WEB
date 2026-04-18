import { supabase } from '../utils/supabase.js';
import { notFound } from '../utils/AppError.js';

export const listCreators = async ({ category, location, search, page, limit }) => {
  const from = (page - 1) * limit;
  const to   = from + limit - 1;

  let query = supabase
    .from('profiles')
    .select('id, username, bio, location, category, avatar_url, banner_url', { count: 'exact' })
    .eq('role', 'creator');

  if (category) query = query.eq('category', category);
  if (location) query = query.ilike('location', `%${location}%`);
  if (search)   query = query.ilike('username', `%${search}%`);

  const { data, error, count } = await query
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
      id, username, bio, location, category, avatar_url, banner_url, created_at,
      portfolio_items (id, title, media_url, media_type, created_at)
    `)
    .eq('id', id)
    .eq('role', 'creator')
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
