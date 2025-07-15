import { ValidatorError } from '../validator/validator';
import { BaseError } from './base.error';

export class ValidationError extends BaseError {
  constructor(
    message: string,
    public errors?: ValidatorError[],
    statusCode = 422,
  ) {
    super(message, statusCode);
  }

  toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      errors: this.errors,
    };
  }
}
