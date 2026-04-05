import { supabase } from '../utils/supabase.js';

export const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token is required' });
  }

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Attach user information to request
    req.user = {
      id: user.id,
      email: user.email,
      role: user.user_metadata?.role
    };
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ message: 'Internal server error during authentication' });
  }
};

export const requireRole = (role) => {
  return (req, res, next) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: `Access denied. Requires ${role} role.` });
    }
    next();
  };
};
