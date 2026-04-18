import { z } from 'zod';

export const createHiringSchema = z.object({
  creator_id:          z.string().uuid(),
  project_title:       z.string().min(3).max(100),
  project_description: z.string().min(10).max(2000),
  budget:              z.number().positive().max(1_000_000)
});

// Role-based allowed transitions enforced in service layer
export const updateStatusSchema = z.object({
  status: z.enum(['Accepted', 'Declined', 'Completed', 'Review'])
});
