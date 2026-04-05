import express from 'express';
import { supabase } from '../utils/supabase.js';

const router = express.Router();

// Register new user
router.post('/register', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    if (!username || !email || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          role
        }
      }
    });

    if (error) {
      if (error.status === 409) {
        return res.status(409).json({ message: 'Email already exists' });
      }
      return res.status(400).json({ message: error.message });
    }

    res.status(201).json({
      message: 'User created successfully',
      session: data.session,
      user: {
        id: data.user.id,
        username: data.user.user_metadata.username,
        email: data.user.email,
        role: data.user.user_metadata.role
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error during registration' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Logged in successfully',
      session: data.session,
      token: data.session.access_token, // Keeping token for legacy client support
      user: {
        id: data.user.id,
        username: data.user.user_metadata.username,
        email: data.user.email,
        role: data.user.user_metadata.role
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error during login' });
  }
});

export default router;
