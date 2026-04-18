import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3).max(30).regex(/^[a-zA-Z0-9_]+$/, 'Alphanumeric and underscores only'),
  email:    z.string().email(),
  password: z.string().min(8).max(72),
  role:     z.enum(['creator', 'brand'])
});

export const loginSchema = z.object({
  email:    z.string().email(),
  password: z.string().min(1)
});
