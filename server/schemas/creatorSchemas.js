import { z } from 'zod';

export const listCreatorsSchema = z.object({
  category:   z.string().max(50).optional(),
  location:   z.string().max(100).optional(),
  search:     z.string().max(100).optional(),
  minBudget:  z.coerce.number().optional(),
  maxBudget:  z.coerce.number().optional(),
  followerTier: z.enum(['Nano', 'Micro', 'Mid', 'Macro', 'Mega', 'Any']).optional(),
  platforms:  z.string().optional(), // Comma-separated
  isAvailable: z.coerce.boolean().optional(),
  minRating:  z.coerce.number().min(0).max(5).optional(),
  tags:       z.string().optional(), // Comma-separated
  page:       z.coerce.number().int().positive().default(1),
  limit:      z.coerce.number().int().min(1).max(100).default(50)
});

export const updateProfileSchema = z.object({
  bio:           z.string().max(500).optional(),
  location:      z.string().max(100).optional(),
  category:      z.string().max(50).optional(),
  avatar_url:    z.string().url().optional(),
  banner_url:    z.string().url().optional(),
  instagram:     z.string().max(50).optional(),
  twitter:       z.string().max(50).optional(),
  website:       z.string().url().or(z.literal('')).optional(),
  min_budget:    z.number().optional(),
  max_budget:    z.number().optional(),
  follower_count: z.number().int().optional(),
  platforms:     z.array(z.string()).optional(),
  is_available:  z.boolean().optional(),
  rating:        z.number().min(0).max(5).optional(),
  tags:          z.array(z.string()).optional()
}).strict();
