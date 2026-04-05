import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import uploadRoutes from './routes/upload.js';
import creatorRoutes from './routes/creators.js';
import hiringRoutes from './routes/hiring.js';
import messageRoutes from './routes/messages.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/creators', creatorRoutes);
app.use('/api/hiring', hiringRoutes);
app.use('/api/messages', messageRoutes);

app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        platform: 'Supabase',
        timestamp: new Date().toISOString()
    });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message || 'Internal server error' });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log('Supabase integration active');
});
