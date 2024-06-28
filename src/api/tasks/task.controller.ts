import { NextFunction, Request, Response } from 'express';
import { TaskService } from './task.service';

export class TaskController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await TaskService.create(req.user!, req.body);

      res.success(200, task);
    } catch (e) {
      next(e);
    }
  }

  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await TaskService.findAll(req.user!);

      res.success(200, task);
    } catch (e) {
      next(e);
    }
  }

  static async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await TaskService.findOne(req.user!, +req.params.taskId);

      res.success(200, task);
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await TaskService.update(req.user!, +req.params.taskId, req.body);

      res.success(200, task);
    } catch (e) {
      next(e);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await TaskService.remove(req.user!, +req.params.taskId);

      res.success(200, task);
    } catch (e) {
      next(e);
    }
  }
}
