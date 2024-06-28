import { Prisma, PrismaClient } from '@prisma/client';
import { ApiError } from '../../utils/api.error';
import { ReqUser } from '../../middlewares/auth.middleware';

const prisma = new PrismaClient();

export class TaskService {
  static async create(user: ReqUser, input: Prisma.TaskCreateInput) {
    const task = await prisma.task.findFirst({
      where: { userId: user.id, title: input.title }
    });
    if (task) throw ApiError.NotFound('Task with same name already exists');

    return prisma.task.create({
      data: {
        title: input.title,
        description: input.description,
        status: input.status,
        user: {
          connect: {
            id: user.id
          }
        }
      }
    });
  }

  static async findAll(user: ReqUser) {
    return prisma.task.findMany({
      where: { userId: user.id }
    });
  }

  static async findOne(user: ReqUser, taskId: number) {
    const task = await prisma.task.findFirst({
      where: { userId: user.id, id: taskId }
    });
    if (!task) throw ApiError.NotFound('Task not found');

    return task;
  }

  static async update(user: ReqUser, taskId: number, input: Prisma.TaskUpdateInput) {
    const task = await prisma.task.findFirst({
      where: { userId: user.id, id: taskId }
    });
    if (!task) throw ApiError.NotFound('Task not found');

    return prisma.task.update({
      where: { id: taskId, userId: user.id },
      data: input
    });
  }

  static async remove(user: ReqUser, taskId: number) {
    const task = await prisma.task.findFirst({
      where: { userId: user.id, id: taskId }
    });
    if (!task) throw ApiError.NotFound('Task not found');

    await prisma.task.delete({
      where: { id: taskId, userId: user.id }
    });
  }
}
