import { ClassValidatorError } from '@core/application/shared/errors/class-validator.error';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { ValidationPipeErrorFilter } from './modules/shared/filters/validation-pipe-error.filter';
import { ValidationErrorFilter } from './modules/shared/filters/validation-error.filter';

export function applyGlobalResources(app: INestApplication) {
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: errors => new ClassValidatorError(errors, 'consumer data validation has failed'),
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  app.useGlobalFilters(new ValidationPipeErrorFilter());
  app.useGlobalFilters(new ValidationErrorFilter());
}
