import { NextFunction, Request, Response } from 'express';
import { AuthService } from './auth.service';

export class AuthController {
  static async signup(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.signup(req.body);

      res.success(201, user);
    } catch (e) {
      next(e);
    }
  }

  static async signin(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.signin(req.body);

      res.cookie('refreshToken', user.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

      const { refreshToken, ...userData } = user;

      res.success(200, userData);
    } catch (e) {
      next(e);
    }
  }

  static async signout(req: Request, res: Response, next: NextFunction) {
    try {
      await AuthService.signout(req.cookies.refreshToken);

      res.clearCookie('refreshToken');

      res.end();
    } catch (e) {
      next(e);
    }
  }

  static async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await AuthService.refresh(req.cookies.refreshToken);

      res.cookie('refreshToken', user.refreshToken, { httpOnly: true, maxAge: 30 * 24 * 60 * 60 * 1000 });

      const { refreshToken, ...userData } = user;

      res.success(200, userData);
    } catch (e) {
      next(e);
    }
  }
}
