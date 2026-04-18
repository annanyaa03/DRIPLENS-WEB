import { supabase } from '../utils/supabase.js';
import { forbidden, notFound } from '../utils/AppError.js';

// Verify caller is a party to the hiring request before any message operation
const assertParty = async (requestId, userId) => {
  const { data, error } = await supabase
    .from('hiring_requests')
    .select('id, brand_id, creator_id')
    .eq('id', requestId)
    .single();

  if (error || !data) throw notFound('Conversation not found');

  const isParty = data.brand_id === userId || data.creator_id === userId;
  if (!isParty) throw forbidden('You do not have access to this conversation');
};

export const getMessages = async (requestId, userId) => {
  await assertParty(requestId, userId);

  const { data, error } = await supabase
    .from('messages')
    .select(`id, content, is_read, created_at, sender:sender_id (id, username, avatar_url)`)
    .eq('hiring_request_id', requestId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
};

export const sendMessage = async (requestId, userId, content) => {
  await assertParty(requestId, userId);

  const { data, error } = await supabase
    .from('messages')
    .insert({ hiring_request_id: requestId, sender_id: userId, content })
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const markRead = async (requestId, userId) => {
  await assertParty(requestId, userId);

  const { error } = await supabase
    .from('messages')
    .update({ is_read: true })
    .eq('hiring_request_id', requestId)
    .neq('sender_id', userId);

  if (error) throw error;
};
