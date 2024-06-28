import bcrypt from 'bcrypt';
import { Prisma, PrismaClient } from '@prisma/client';
import { ApiError } from '../../utils/api.error';
import { ReqUser } from '../../middlewares/auth.middleware';

const prisma = new PrismaClient();

export class UserService {
  static async me(user: ReqUser) {
    const exist = await prisma.user.findUnique({
      where: { id: user.id }
    });
    if (!exist) throw ApiError.NotFound('User not found');

    const { password, ...userData } = exist;

    return userData;
  }

  static async update(user: ReqUser, input: Prisma.UserUpdateInput) {
    const exist = await prisma.user.findUnique({
      where: { id: user.id }
    });
    if (!exist) throw ApiError.NotFound('User not found');

    if (input.password) {
      const salt = await bcrypt.genSalt(10);
      input.password = await bcrypt.hash(<string> input.password, salt);
    }

    const { password, ...userData } = await prisma.user.update({
      where: { id: user.id },
      data: input
    });

    return userData;
  }

  static async remove(user: ReqUser) {
    await prisma.user.delete({
      where: { id: user.id },
      include: { tasks: true, token: true }
    });
    throw ApiError.NotFound('User not found');
  }
}
