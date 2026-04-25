import { AppError } from '../utils/AppError.js';

/**
 * @param {import('zod').ZodSchema} schema
 * @param {'body'|'query'|'params'} source
 */
export const validate = (schema, source = 'body') => (req, res, next) => {
  const result = schema.safeParse(req[source]);
  if (!result.success) {
    const issues = result.error.issues || result.error.errors || [];
    const messages = issues.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
    return next(new AppError(messages || 'Validation failed', 400, 'VALIDATION_ERROR'));
  }
  req[source] = result.data; // replace with coerced/stripped data
  next();
};
