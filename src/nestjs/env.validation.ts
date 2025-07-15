import { Validator } from '@core/application/shared/validator/validator';
import { plainToInstance } from 'class-transformer';

type ClassConstructor<T> = {
  new (...args: any[]): T;
};

type ValidateProps = {
  config: Record<string, unknown>;
  variablesClass: ClassConstructor<any>;
  errorMessage: string;
};

export function validate(payload: ValidateProps) {
  const variables = plainToInstance(payload.variablesClass, payload.config, {
    enableImplicitConversion: true,
  });

  new Validator({
    errorMessage: payload.errorMessage,
    stopAtFirstError: false,
  }).execute(variables);

  return variables;
}
