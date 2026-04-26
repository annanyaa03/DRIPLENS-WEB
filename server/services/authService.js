import { supabase } from '../utils/supabase.js';
import { conflict, unauthorized } from '../utils/AppError.js';
import { env } from '../config/env.js';
import fs from 'fs';
import path from 'path';

// --- Local File-Based Auth Logic (Fallback) ---
const USERS_FILE = path.join(process.cwd(), 'users.json');
const isLocalAuth = env.SUPABASE_URL.includes('dummy');

const readUsers = () => {
  if (fs.existsSync(USERS_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(USERS_FILE, 'utf8'));
    } catch { return []; }
  }
  return [];
};

const writeUsers = (users) => {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8');
};

export const register = async ({ username, email, password, role, display_name, tagline }) => {
  if (isLocalAuth) {
    const users = readUsers();
    if (users.find(u => u.email === email)) throw conflict('Email already in use');
    
    const newUser = {
      id: Date.now().toString(),
      username,
      email,
      password,
      role
    };
    
    users.push(newUser);
    writeUsers(users);
    
    return {
      access_token: 'local-token-' + newUser.id,
      user: { id: newUser.id, username, email, role }
    };
  }

  // Supabase Auth
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

  await supabase.from('profiles').upsert({ 
    id: data.user.id, 
    username, 
    role,
    display_name,
    tagline
  }, { onConflict: 'id' });

  const { data: sessionData, error: sessionError } = await supabase.auth.signInWithPassword({ email, password });
  if (sessionError) throw sessionError;

  return {
    access_token:  sessionData.session.access_token,
    refresh_token: sessionData.session.refresh_token,
    user: {
      id:       sessionData.user.id,
      email:    sessionData.user.email,
      username: sessionData.user.user_metadata.username,
      role:     sessionData.user.user_metadata.role
    }
  };
};

export const login = async ({ email: identifier, password }) => {
  if (isLocalAuth) {
    const users = readUsers();
    // Support both email and username login in local mode
    const user = users.find(u => 
      (u.email === identifier || u.username === identifier) && u.password === password
    );
    
    if (!user) throw unauthorized('Invalid email/username or password');
    
    return {
      access_token: 'local-token-' + user.id,
      user: { id: user.id, username: user.username, email: user.email, role: user.role }
    };
  }

  // Supabase Auth
  let loginEmail = identifier;
  // If no @, assume it's a username and try to find the email
  if (!identifier.includes('@')) {
    const { data: profile } = await supabase.from('profiles').select('id').eq('username', identifier).single();
    if (profile) {
      const { data: userRec } = await supabase.auth.admin.getUserById(profile.id);
      if (userRec?.user) loginEmail = userRec.user.email;
    }
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email: loginEmail, password });
  if (error) throw unauthorized('Invalid email or password');

  return {
    access_token:  data.session.access_token,
    refresh_token: data.session.refresh_token,
    user: {
      id:       data.user.id,
      email:    data.user.email,
      username: data.user.user_metadata.username,
      role:     data.user.user_metadata.role
    }
  };
};

export const refreshToken = async (refresh_token) => {
  if (isLocalAuth) {
    return { access_token: 'local-token-refreshed', expires_in: 3600 };
  }
  const { data, error } = await supabase.auth.refreshSession({ refresh_token });
  if (error) throw unauthorized('Invalid refresh token');
  return {
    access_token:  data.session.access_token,
    refresh_token: data.session.refresh_token,
    expires_in:    data.session.expires_in
  };
};
