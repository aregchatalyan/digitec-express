import { Schema } from 'express-validator';

export const createValidatorSchema: Schema = {
  title: {
    in: 'body',
    trim: true,
    escape: true,
    isLength: {
      options: {
        min: 2,
        max: 100
      },
      errorMessage: 'The title must be between 2 and 100 characters long'
    }
  },
  description: {
    in: 'body',
    trim: true,
    escape: true,
    isLength: {
      options: {
        min: 2,
        max: 500
      },
      errorMessage: 'The title must be between 2 and 500 characters long'
    }
  },
  status: {
    in: 'body',
    escape: true,
    toBoolean: true,
    isBoolean: {
      errorMessage: 'The password must boolean'
    }
  }
}

export const updateValidatorSchema: Schema = {
  title: {
    in: 'body',
    trim: true,
    escape: true,
    optional: true,
    isLength: {
      options: {
        min: 2,
        max: 100
      },
      errorMessage: 'The title must be between 2 and 100 characters long'
    }
  },
  description: {
    in: 'body',
    trim: true,
    escape: true,
    optional: true,
    isLength: {
      options: {
        min: 2,
        max: 500
      },
      errorMessage: 'The title must be between 2 and 500 characters long'
    }
  },
  status: {
    in: 'body',
    escape: true,
    optional: true,
    toBoolean: true,
    isBoolean: {
      errorMessage: 'The password must boolean'
    }
  }
}
