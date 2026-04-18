import { supabase } from '../utils/supabase.js';
import { forbidden, notFound } from '../utils/AppError.js';

// Allowed status transitions by role
const TRANSITIONS = {
  brand:   ['Completed'],
  creator: ['Accepted', 'Declined', 'Review']
};

export const createRequest = async ({ brandId, creator_id, project_title, project_description, budget }) => {
  const { data, error } = await supabase
    .from('hiring_requests')
    .insert({ brand_id: brandId, creator_id, project_title, project_description, budget })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const listRequests = async (userId) => {
  const { data, error } = await supabase
    .from('hiring_requests')
    .select(`
      *,
      brand:brand_id (id, username, avatar_url),
      creator:creator_id (id, username, avatar_url)
    `)
    .or(`brand_id.eq.${userId},creator_id.eq.${userId}`)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

export const updateStatus = async (requestId, userId, role, newStatus) => {
  // Verify the request exists and the user is a party to it
  const { data: existing, error: fetchErr } = await supabase
    .from('hiring_requests')
    .select('id, brand_id, creator_id, status')
    .eq('id', requestId)
    .single();

  if (fetchErr || !existing) throw notFound('Hiring request not found');

  const isParty = existing.brand_id === userId || existing.creator_id === userId;
  if (!isParty) throw forbidden('You are not a party to this request');

  // Enforce role-based transition rules
  const allowed = TRANSITIONS[role] || [];
  if (!allowed.includes(newStatus)) {
    throw forbidden(`Your role cannot set status to "${newStatus}"`);
  }

  const { data, error } = await supabase
    .from('hiring_requests')
    .update({ status: newStatus })
    .eq('id', requestId)
    .select()
    .single();

  if (error) throw error;
  return data;
};
