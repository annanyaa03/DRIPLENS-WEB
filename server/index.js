import 'dotenv/config';
import './config/env.js';                     // Validate env vars before anything else

import express    from 'express';
import helmet     from 'helmet';
import cors       from 'cors';
import v1Routes   from './routes/v1/index.js';
import { errorHandler } from './middleware/errorHandler.js';
import { supabase }     from './utils/supabase.js';
import logger           from './utils/logger.js';
import { createServer } from 'http';
import { initSocket }  from './utils/socket.js';
import { env }          from './config/env.js';

const app = express();
const httpServer = createServer(app);

// Initialize Socket.io
initSocket(httpServer, env.CLIENT_URL);

// ── Security headers ──────────────────────────────────────────
app.use(helmet());

// ── CORS — whitelist only your client URL ─────────────────────
app.use(cors({
  origin:      env.CLIENT_URL,
  credentials: true,
  methods:     ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ── Body parsing ──────────────────────────────────────────────
app.use(express.json({ limit: '1mb' }));     // 1mb for JSON — not 10mb
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// ── API routes ────────────────────────────────────────────────
app.use('/api/v1', v1Routes);

// ── Health check — actually tests Supabase connectivity ───────
app.get('/api/health', async (req, res) => {
  try {
    await supabase.from('profiles').select('id').limit(1);
    res.json({ status: 'ok', db: 'connected', timestamp: new Date().toISOString() });
  } catch {
    res.status(503).json({ status: 'degraded', db: 'unreachable', timestamp: new Date().toISOString() });
  }
});

// ── 404 handler ───────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, error: { code: 'NOT_FOUND', message: `Route ${req.method} ${req.path} not found` } });
});

// ── Global error handler (must be last) ──────────────────────
app.use(errorHandler);

// ── Boot ──────────────────────────────────────────────────────
const PORT = env.PORT;
httpServer.listen(PORT, () => {
  logger.info(`Server started`, { port: PORT, env: env.NODE_ENV });
});


export default app; // needed for supertest in tests

process.on('exit', (code) => {
  console.log(`Process exiting with code: ${code}`);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});


process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Workaround for mysterious exit with code 0
setInterval(() => {}, 1000);


