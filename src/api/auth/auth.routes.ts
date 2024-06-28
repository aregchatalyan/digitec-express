import { Router } from 'express';
import { AuthController } from './auth.controller';
import { validate } from '../../middlewares/validation.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import {
  signUpValidatorSchema,
  signInValidatorSchema
} from './auth.validator';

export const authRouter = Router();

authRouter.post('/signup',
  validate(signUpValidatorSchema),
  AuthController.signup
);

authRouter.post('/signin',
  validate(signInValidatorSchema),
  AuthController.signin
);

authRouter.post('/signout',
  authMiddleware,
  AuthController.signout
);

authRouter.put('/refresh',
  AuthController.refresh
);
