import type { Request, Response, NextFunction } from 'express';
import { ItemValidationError, ItemNotFoundError } from '../item/item.js';

export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', err.message);

  if (err instanceof ItemValidationError) {
    res.status(400).json({
      error: 'Validation Error',
      message: err.message,
      statusCode: 400
    } as ErrorResponse);
    return;
  }

  if (err instanceof ItemNotFoundError) {
    res.status(404).json({
      error: 'Not Found',
      message: err.message,
      statusCode: 404
    } as ErrorResponse);
    return;
  }

  
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'Something went wrong on the server',
    statusCode: 500
  } as ErrorResponse);
};

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};