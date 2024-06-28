import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
import { config } from '../config';

const prisma = new PrismaClient();

export interface JwtPayload {
  id: number;
  email: string;
}

export class JwtService {
  static generate(payload: JwtPayload) {
    return {
      accessToken: jwt.sign(payload, config.get('JWT_ACCESS_SECRET'), { expiresIn: '1d' }),
      refreshToken: jwt.sign(payload, config.get('JWT_REFRESH_SECRET'), { expiresIn: '30d' })
    }
  }

  static validate(token: string, type: 'JWT_ACCESS_SECRET' | 'JWT_REFRESH_SECRET') {
    try {
      return jwt.verify(token, config.get(type)) as JwtPayload;
    } catch (e) {
      return null;
    }
  }

  static async save(userId: number, refreshToken: string) {
    const exists = await prisma.token.findUnique({
      where: { userId }
    });
    if (exists) {
      return prisma.token.update({
        where: { userId },
        data: { refreshToken }
      });
    }

    return prisma.token.create({
      data: { userId, refreshToken }
    });
  }

  static async remove(refreshToken: string) {
    return prisma.token.delete({
      where: { refreshToken }
    });
  }

  static async find(refreshToken: string) {
    return prisma.token.findUnique({
      where: { refreshToken }
    });
  }
}