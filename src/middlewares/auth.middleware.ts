import { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { ApiError } from '../utils/api.error';
import { JwtService } from '../services/jwt.service';

const prisma = new PrismaClient();

export interface ReqUser {
  id: number;
  email: string;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (req.method === 'OPTIONS') return next();

  try {
    const accessToken = req.headers.authorization?.split(' ')[1];
    if (!accessToken) return next(ApiError.Unauthorized());

    const decoded = JwtService.validate(accessToken, 'JWT_ACCESS_SECRET');
    if (!decoded) return next(ApiError.Unauthorized());

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: {
        id: true,
        email: true
      }
    });
    if (!user) return next(ApiError.Unauthorized());

    req.user = user as ReqUser;

    next();
  } catch (e) {
    return next(ApiError.Unauthorized());
  }
}
