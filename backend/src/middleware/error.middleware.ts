import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';
import { ZodError } from 'zod';

export function errorMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error('Error:', error);

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      code: error.code,
      message: error.message,
    });
    return;
  }

  if (error instanceof ZodError) {
    const messages = error.errors.map((e) => e.message).join(', ');
    res.status(400).json({
      code: 'VALIDATION_ERROR',
      message: messages,
      errors: error.errors,
    });
    return;
  }

  res.status(500).json({
    code: 'INTERNAL_ERROR',
    message: 'サーバーエラーが発生しました',
  });
}
