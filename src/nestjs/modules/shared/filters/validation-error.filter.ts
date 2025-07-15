import { ErrorLog } from '@core/application/shared/error-log';
import { ValidationError } from '@core/application/shared/errors/validation.error';
import { ExceptionFilter, Catch } from '@nestjs/common';

@Catch(ValidationError)
export class ValidationErrorFilter implements ExceptionFilter {
  async catch(exception: ValidationError) {
    if (process.env.ENVIRONMENT !== 'production') {
      ErrorLog.log(this.constructor.name, exception);
    }
  }
}
