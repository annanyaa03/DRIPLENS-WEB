import { supabase } from '../utils/supabase.js';
import { conflict, unauthorized } from '../utils/AppError.js';

export const register = async ({ username, email, password, role }) => {
  // Supabase Auth handles hashing, salting, tokens — everything
  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    user_metadata: { username, role },
    email_confirm: true
  });

  if (error) {
    if (error.message.includes('already registered')) throw conflict('Email already in use');
    throw error;
  }

  // Create profile row
  await supabase.from('profiles').insert({
    id:       data.user.id,
    username,
    role
  });

  // Issue a session immediately so the client doesn't need a second round-trip
  const { data: sessionData, error: sessionError } = await supabase.auth.signInWithPassword({ email, password });
  if (sessionError) throw sessionError;

  return {
    access_token:  sessionData.session.access_token,
    refresh_token: sessionData.session.refresh_token,
    expires_in:    sessionData.session.expires_in,
    user: {
      id:       sessionData.user.id,
      email:    sessionData.user.email,
      username: sessionData.user.user_metadata.username,
      role:     sessionData.user.user_metadata.role
    }
  };
};

export const login = async ({ email, password }) => {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw unauthorized('Invalid email or password');

  return {
    access_token:  data.session.access_token,
    refresh_token: data.session.refresh_token,
    expires_in:    data.session.expires_in,
    user: {
      id:       data.user.id,
      email:    data.user.email,
      username: data.user.user_metadata.username,
      role:     data.user.user_metadata.role
    }
  };
};

export const refreshToken = async (refresh_token) => {
  const { data, error } = await supabase.auth.refreshSession({ refresh_token });
  if (error) throw unauthorized('Invalid refresh token');
  return {
    access_token:  data.session.access_token,
    refresh_token: data.session.refresh_token,
    expires_in:    data.session.expires_in
  };
};
