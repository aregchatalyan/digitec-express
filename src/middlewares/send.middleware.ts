import { NextFunction, Request, Response } from 'express';

export const sendMiddleware = (_req: Request, res: Response, next: NextFunction) => {
  res.success = (status, data, message) => {
    return res.status(status).json({ message, data });
  }

  res.failed = (status, message, errors) => {
    return res.status(status).json({ message, errors });
  }

  next();
}
