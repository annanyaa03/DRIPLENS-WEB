import { supabase } from '../utils/supabase.js';
import { AppError } from '../utils/AppError.js';
import { ALLOWED_MIME_TYPES, MAX_FILE_SIZE } from '../schemas/uploadSchemas.js';
import { v4 as uuidv4 } from 'uuid';

export const validateFile = (file) => {
  if (!file) throw new AppError('No file uploaded', 400, 'NO_FILE');
  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {
    throw new AppError(
      `File type not allowed. Allowed: ${ALLOWED_MIME_TYPES.join(', ')}`,
      415, 'INVALID_FILE_TYPE'
    );
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new AppError('File too large. Maximum size is 50MB', 413, 'FILE_TOO_LARGE');
  }
};

export const uploadPortfolio = async (userId, file, { title, description, category }) => {
  validateFile(file);

  const ext      = file.originalname.split('.').pop().toLowerCase();
  const safeName = `${userId}/${uuidv4()}.${ext}`;         // uuid prevents path guessing
  const filePath = `portfolio/${safeName}`;

  const { error: uploadError } = await supabase.storage
    .from('portfolio-media')
    .upload(filePath, file.buffer, {
      contentType:  file.mimetype,
      cacheControl: '31536000',  // 1 year — content is immutable once uploaded
      upsert:       false
    });

  if (uploadError) throw uploadError;

  const { data: { publicUrl } } = supabase.storage
    .from('portfolio-media')
    .getPublicUrl(filePath);

  const { data, error: dbError } = await supabase
    .from('portfolio_items')
    .insert({
      creator_id:   userId,
      title,
      description:  description || null,
      category,
      media_url:    publicUrl,
      media_type:   file.mimetype.startsWith('video') ? 'video' : 'image',
      storage_path: filePath
    })
    .select()
    .single();

  if (dbError) {
    // Attempt cleanup — don't leave orphaned storage objects
    await supabase.storage.from('portfolio-media').remove([filePath]);
    throw dbError;
  }

  return data;
};

export const listPortfolio = async ({ page, limit }) => {
  const from = (page - 1) * limit;
  const to   = from + limit - 1;

  const { data, error, count } = await supabase
    .from('portfolio_items')
    .select('*, author:profiles(username, avatar_url)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) throw error;

  return {
    items:      data,
    pagination: { page, limit, total: count, totalPages: Math.ceil(count / limit) }
  };
};
