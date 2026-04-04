import express from 'express';
import multer from 'multer';
import { requireAuth } from '../middleware/auth.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';
import Content from '../models/Content.js';

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

    const result = await uploadToCloudinary(req.file.buffer, 'auto');
    
    const newContent = new Content({
      title,
      description,
      category,
      mediaUrl: result.secure_url,
      publicId: result.public_id,
      mediaType: result.resource_type === 'video' ? 'video' : 'image',
      author: req.user.userId // Corrected to match JWT payload
    });

    await newContent.save();

    res.status(200).json({
      message: 'Upload successful',
      content: newContent
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading file' });
  }
});

// GET /api/upload - Fetch all content for Explore page
router.get('/', async (req, res) => {
  try {
    const contents = await Content.find()
      .populate('author', 'username profile.avatarUrl')
      .sort({ createdAt: -1 });
    
    res.status(200).json(contents);
  } catch (error) {
    console.error('Fetch content error:', error);
    res.status(500).json({ message: 'Error fetching content' });
  }
});

export default router;
