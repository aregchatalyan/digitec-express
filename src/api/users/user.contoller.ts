import { NextFunction, Request, Response } from 'express';
import { UserService } from './user.service';

export class UserController {
  static async me(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.me(req.user!);

      res.success(200, user);
    } catch (e) {
      next(e);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.update(req.user!, req.body);

      res.success(200, user);
    } catch (e) {
      next(e);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.remove(req.user!);

      res.success(200, user);
    } catch (e) {
      next(e);
    }
  }
}
