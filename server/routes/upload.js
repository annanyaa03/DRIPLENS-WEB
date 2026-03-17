import express from 'express';
import multer from 'multer';
import { requireAuth } from '../middleware/auth.js';
import { uploadToCloudinary } from '../utils/cloudinary.js';

const router = express.Router();

// Configure multer to use memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/portfolio', requireAuth, upload.single('media'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await uploadToCloudinary(req.file.buffer, 'auto');
    
    res.status(200).json({
      message: 'Upload successful',
      url: result.secure_url,
      publicId: result.public_id,
      resourceType: result.resource_type
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading file' });
  }
});

export default router;
