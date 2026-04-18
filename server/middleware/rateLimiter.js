import rateLimit from 'express-rate-limit';
import { AppError } from '../utils/AppError.js';

const makeHandler = (windowMs, max, message) =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res, next) => next(new AppError(message, 429, 'RATE_LIMITED'))
  });

// Auth endpoints — strict (5 attempts per 15 min)
export const authLimiter = makeHandler(
  15 * 60 * 1000,
  5,
  'Too many attempts. Please wait 15 minutes before trying again.'
);

// General API — generous (100 req/min)
export const apiLimiter = makeHandler(
  60 * 1000,
  100,
  'Too many requests. Please slow down.'
);

// Upload endpoints — tighter (20 uploads/hour)
export const uploadLimiter = makeHandler(
  60 * 60 * 1000,
  20,
  'Upload limit reached. Try again in an hour.'
);
