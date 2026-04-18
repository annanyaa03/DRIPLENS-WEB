import { z } from 'zod';

export const uploadMetaSchema = z.object({
  title:       z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  category:    z.string().min(1).max(50)
});

export const ALLOWED_MIME_TYPES = [
  'image/jpeg', 'image/png', 'image/webp', 'image/gif',
  'video/mp4', 'video/quicktime', 'video/webm'
];

export const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
