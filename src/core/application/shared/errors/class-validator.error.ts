import { ValidationError as DefaultValidationError } from 'class-validator';
import { BaseError } from './base.error';

export type ValidationError = {
  field: string;
  messages: string[];
  path?: string;
};

export class ClassValidatorError extends BaseError {
  private _errors: ValidationError[] = [];

  constructor(errors: DefaultValidationError[], errorMessage = 'data validation has failed', statusCode = 422) {
    super(errorMessage, statusCode);

    errors.forEach(error => {
      this.setErrors(error, error.property);
    });
  }

  private setErrors(error: DefaultValidationError, index: string, path?: string) {
    if (error.constraints) {
      this._errors = [
        ...this.errors,
        {
          // value: error.value,
          // target: error.target,
          field: error.property,
          messages: Object.values(error.constraints),
          path,
        },
      ];
    }

    if (error.children?.length) {
      error.children.forEach(item =>
        this.setErrors(item, index, path ? `${path}.${item.property}` : `${error.property}.${item.property}`),
      );
    }
  }

  get errors(): ValidationError[] {
    return this._errors;
  }

  toJSON() {
    return {
      message: this.message,
      statusCode: this.statusCode,
      errors: this.errors,
    };
  }
}
