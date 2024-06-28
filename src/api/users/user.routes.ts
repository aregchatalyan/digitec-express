import { Router } from 'express';
import { UserController } from './user.contoller';
import { updateValidatorSchema } from './user.validator';
import { validate } from '../../middlewares/validation.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';

export const userRouter = Router();

userRouter.get('/',
  authMiddleware,
  UserController.me
);

userRouter.put('/',
  authMiddleware,
  validate(updateValidatorSchema),
  UserController.update
);

userRouter.delete('/',
  authMiddleware,
  UserController.remove
);
