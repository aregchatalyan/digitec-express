import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/api.error';

export const errorMiddleware = (err: Error | ApiError, _req: Request, res: Response, _next: NextFunction) => {
  if (err && err instanceof ApiError) return res.failed(err.status, err.message, err.errors);

  console.log(err.message);
  res.failed(500, 'Oops! Something went wrong!');
}
