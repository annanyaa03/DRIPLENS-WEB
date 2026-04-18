import { Router } from 'express';
import { validate } from '../../middleware/validate.js';
import { requireAuth } from '../../middleware/auth.js';
import { apiLimiter } from '../../middleware/rateLimiter.js';
import { sendMessageSchema } from '../../schemas/messageSchemas.js';
import * as messageService from '../../services/messageService.js';

const router = Router();

router.get('/:requestId', requireAuth, apiLimiter, async (req, res, next) => {
  try {
    const messages = await messageService.getMessages(req.params.requestId, req.user.id);
    res.json({ success: true, data: { messages } });
  } catch (err) { next(err); }
});

router.post('/:requestId', requireAuth, apiLimiter, validate(sendMessageSchema), async (req, res, next) => {
  try {
    const message = await messageService.sendMessage(req.params.requestId, req.user.id, req.body.content);
    res.status(201).json({ success: true, data: { message } });
  } catch (err) { next(err); }
});

router.patch('/:requestId/read', requireAuth, async (req, res, next) => {
  try {
    await messageService.markRead(req.params.requestId, req.user.id);
    res.json({ success: true });
  } catch (err) { next(err); }
});

export default router;
