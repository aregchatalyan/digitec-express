import { Prisma, PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import { ApiError } from '../../utils/api.error';
import { JwtService } from '../../services/jwt.service';

const prisma = new PrismaClient();

export class AuthService {
  static async signup(input: Prisma.UserCreateInput) {
    const exist = await prisma.user.findUnique({
      where: { email: input.email }
    });
    if (exist) throw ApiError.BadRequest('User already exists');

    const salt = await bcrypt.genSalt(10);
    input.password = await bcrypt.hash(input.password, salt);

    const { password, ...user } = await prisma.user.create({ data: input });

    return user;
  }

  static async signin(input: Omit<Prisma.UserCreateInput, 'username'>) {
    const user = await prisma.user.findUnique({
      where: { email: input.email }
    });
    if (!user) throw ApiError.NotFound('User not found');

    const isValid = await bcrypt.compare(input.password, user.password);
    if (!isValid) throw ApiError.BadRequest('Wrong username or password');

    const tokens = JwtService.generate({
      id: user.id,
      email: user.email
    });

    await JwtService.save(user.id, tokens.refreshToken);

    const { password, ...userData } = user;

    return { ...userData, ...tokens }
  }

  static async signout(refreshToken: string) {
    if (!refreshToken) throw ApiError.Unauthorized();

    return JwtService.remove(refreshToken);
  }

  static async refresh(refreshToken: string) {
    if (!refreshToken) throw ApiError.Unauthorized();

    const isValid = JwtService.validate(refreshToken, 'JWT_REFRESH_SECRET');
    const session = await JwtService.find(refreshToken);
    if (!isValid || !session) throw ApiError.Unauthorized();

    const user = await prisma.user.findUnique({
      where: { id: session.userId }
    });
    if (!user) throw ApiError.Unauthorized();

    const tokens = JwtService.generate({
      id: user.id,
      email: user.email
    });
    await JwtService.save(user.id, tokens.refreshToken);

    const { password, ...userData } = user;

    return { ...userData, ...tokens }
  }
}
