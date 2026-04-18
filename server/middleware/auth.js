import { supabase } from '../utils/supabase.js';
import { unauthorized, forbidden } from '../utils/AppError.js';
import logger from '../utils/logger.js';

export const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return next(unauthorized('Authentication token required'));

  try {
    const { data: { user }, error } = await supabase.auth.getUser(token);
    if (error || !user) return next(unauthorized('Invalid or expired token'));

    req.user = {
      id:    user.id,
      email: user.email,
      role:  user.user_metadata?.role
    };
    next();
  } catch (err) {
    logger.error('Auth middleware error', { error: err.message });
    next(err);
  }
};

export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return next(forbidden(`Access denied. Requires role: ${roles.join(' or ')}`));
  }
  next();
};
