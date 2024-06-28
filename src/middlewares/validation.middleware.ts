import { NextFunction, Request, Response } from 'express';
import { checkSchema, Schema, validationResult } from 'express-validator';
import { ApiError } from '../utils/api.error';

export const validate = (schema: Schema) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    await checkSchema(schema).run(req);

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest('Validation failed.', errors.mapped()));
    }

    next();
  }
}
