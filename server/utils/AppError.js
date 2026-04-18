export class AppError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
    Error.captureStackTrace(this, this.constructor);
  }
}

// Convenience factories
export const badRequest  = (msg) => new AppError(msg, 400, 'BAD_REQUEST');
export const unauthorized = (msg) => new AppError(msg, 401, 'UNAUTHORIZED');
export const forbidden   = (msg) => new AppError(msg, 403, 'FORBIDDEN');
export const notFound    = (msg) => new AppError(msg, 404, 'NOT_FOUND');
export const conflict    = (msg) => new AppError(msg, 409, 'CONFLICT');
