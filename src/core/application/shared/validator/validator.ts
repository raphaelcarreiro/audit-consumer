import { validateSync } from 'class-validator';
import { ValidationError } from '../errors/validation.error';
import { ValidationError as ClassValidatorValidationError } from 'class-validator';

export type ValidatorError = {
  field: string;
  messages: string[];
  path?: string;
  value?: any;
  target?: any;
};

type Options = {
  stopAtFirstError?: boolean;
  errorMessage?: string;
};

export class Validator {
  private errors: ValidatorError[] = [];
  private stopAtFirstError: boolean;
  private errorMessage = 'Data validation has failed';

  constructor(options?: Options) {
    this.stopAtFirstError = options?.stopAtFirstError || false;
    this.errorMessage = options?.errorMessage || 'Data validation has failed';
  }

  execute(payload: any) {
    const validationErrors = validateSync(payload, {
      stopAtFirstError: this.stopAtFirstError,
      whitelist: true,
    });

    if (!validationErrors.length) {
      return;
    }

    validationErrors.forEach(error => {
      this.setErrors(error, error.property);
    });

    throw new ValidationError(this.errorMessage, this.errors);
  }

  private setErrors(error: ClassValidatorValidationError, index: string, path?: string) {
    if (error.constraints) {
      this.errors = [
        ...this.errors,
        {
          // target: error.target,
          field: error.property,
          messages: Object.values(error.constraints),
          value: error.value,
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
}

export class ValidatorFactory {
  static create(options?: Options) {
    return new Validator(options);
  }
}
