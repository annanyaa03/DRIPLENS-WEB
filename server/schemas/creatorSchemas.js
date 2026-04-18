import { z } from 'zod';

export const listCreatorsSchema = z.object({
  category: z.string().max(50).optional(),
  location: z.string().max(100).optional(),
  search:   z.string().max(100).optional(),
  page:     z.coerce.number().int().positive().default(1),
  limit:    z.coerce.number().int().min(1).max(50).default(20)
});

export const updateProfileSchema = z.object({
  bio:        z.string().max(500).optional(),
  location:   z.string().max(100).optional(),
  category:   z.string().max(50).optional(),
  avatar_url: z.string().url().optional(),
  banner_url: z.string().url().optional()
}).strict();
