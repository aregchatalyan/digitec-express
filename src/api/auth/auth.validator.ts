import { Schema } from 'express-validator';

export const signUpValidatorSchema: Schema = {
  username: {
    in: 'body',
    trim: true,
    escape: true,
    isLength: {
      options: {
        min: 2,
        max: 20
      },
      errorMessage: 'The username must be between 2 and 20 characters long'
    }
  },
  email: {
    in: 'body',
    trim: true,
    escape: true,
    isEmail: {
      errorMessage: 'Please enter a valid email address'
    }
  },
  password: {
    in: 'body',
    trim: true,
    escape: true,
    isLength: {
      options: {
        min: 6,
        max: 20
      },
      errorMessage: 'The password must be between 6 and 20 characters long'
    }
  }
}

export const signInValidatorSchema: Schema = {
  email: {
    in: 'body',
    trim: true,
    escape: true,
    isEmail: {
      errorMessage: 'Please enter a valid email address'
    }
  },
  password: {
    in: 'body',
    trim: true,
    escape: true,
    isLength: {
      options: {
        min: 6,
        max: 20
      },
      errorMessage: 'The password must be between 6 and 20 characters long'
    }
  }
}
