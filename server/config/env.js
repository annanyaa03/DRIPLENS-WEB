import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV:                  z.enum(['development', 'production', 'test']).default('development'),
  PORT:                      z.string().default('5001'),
  CLIENT_URL:                z.string().url(),
  SUPABASE_URL:              z.string().url(),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(10),
  LOG_LEVEL:                 z.enum(['debug', 'info', 'warn', 'error']).default('info'),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error('❌ Invalid environment variables:\n', parsed.error.format());
  process.exit(1);
}

export const env = parsed.data;
