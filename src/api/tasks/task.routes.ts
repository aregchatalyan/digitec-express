import { Router } from 'express';
import { TaskController } from './task.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { validate } from '../../middlewares/validation.middleware';
import { createValidatorSchema, updateValidatorSchema } from './task.validator';

export const taskRouter = Router();

taskRouter.post('/',
  authMiddleware,
  validate(createValidatorSchema),
  TaskController.create
);

taskRouter.get('/',
  authMiddleware,
  TaskController.findAll
);

taskRouter.get('/:taskId',
  authMiddleware,
  TaskController.findOne
);

taskRouter.put('/:taskId',
  authMiddleware,
  validate(updateValidatorSchema),
  TaskController.update
);

taskRouter.delete('/:taskId',
  authMiddleware,
  TaskController.remove
);
