import express from 'express';
import multer from 'multer';
import { requireAuth } from '../middleware/auth.js';
import { supabase } from '../utils/supabase.js';

const router = express.Router();

// Configure multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// POST /api/upload/portfolio - Upload media and save metadata
router.post('/portfolio', requireAuth, upload.single('media'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const { title, description, category } = req.body;

    if (!title || !category) {
      return res.status(400).json({ message: 'Title and Category are required' });
    }

    const fileExt = req.file.originalname.split('.').pop();
    const fileName = `${req.user.id}/${Date.now()}.${fileExt}`;
    const filePath = `portfolio/${fileName}`;

    // 1. Upload to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('portfolio-media')
      .upload(filePath, req.file.buffer, {
        contentType: req.file.mimetype,
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Supabase Storage error:', uploadError);
      return res.status(500).json({ message: 'Error uploading to storage' });
    }

    // 2. Get Public URL
    const { data: { publicUrl } } = supabase.storage
      .from('portfolio-media')
      .getPublicUrl(filePath);

    // 3. Save metadata to PostgreSQL
    const { data: contentData, error: dbError } = await supabase
      .from('portfolio_items')
      .insert([
        {
          creator_id: req.user.id,
          title,
          description,
          category,
          media_url: publicUrl,
          media_type: req.file.mimetype.startsWith('video') ? 'video' : 'image',
          storage_path: filePath
        }
      ])
      .select()
      .single();

    if (dbError) {
      console.error('Supabase DB error:', dbError);
      return res.status(500).json({ message: 'Error saving metadata' });
    }

    res.status(200).json({
      message: 'Upload successful',
      content: contentData
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error processing upload' });
  }
});

// GET /api/upload - Fetch content for Explore page with pagination
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data: contents, error, count } = await supabase
      .from('portfolio_items')
      .select(`
        *,
        author:profiles(username, avatar_url)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to);

    if (error) {
      throw error;
    }
    
    res.status(200).json({
      items: contents,
      pagination: {
        page,
        limit,
        totalItems: count,
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    console.error('Fetch content error:', error);
    res.status(500).json({ message: 'Error fetching content' });
  }
});

export default router;
