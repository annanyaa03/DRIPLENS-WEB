import { Router } from 'express';
import { validate } from '../../middleware/validate.js';
import { requireAuth, requireRole } from '../../middleware/auth.js';
import { apiLimiter } from '../../middleware/rateLimiter.js';
import { createHiringSchema, updateStatusSchema } from '../../schemas/hiringSchemas.js';
import * as hiringService from '../../services/hiringService.js';

const router = Router();

router.post('/', requireAuth, requireRole('brand'), validate(createHiringSchema), async (req, res, next) => {
  try {
    const request = await hiringService.createRequest({ brandId: req.user.id, ...req.body });
    res.status(201).json({ success: true, data: { request } });
  } catch (err) { next(err); }
});

router.get('/', requireAuth, apiLimiter, async (req, res, next) => {
  try {
    const requests = await hiringService.listRequests(req.user.id);
    res.json({ success: true, data: { requests } });
  } catch (err) { next(err); }
});

router.patch('/:id/status', requireAuth, validate(updateStatusSchema), async (req, res, next) => {
  try {
    const request = await hiringService.updateStatus(
      req.params.id, req.user.id, req.user.role, req.body.status
    );
    res.json({ success: true, data: { request } });
  } catch (err) { next(err); }
});

export default router;
