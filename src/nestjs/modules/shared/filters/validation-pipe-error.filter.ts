import { ErrorLog } from '@core/application/shared/error-log';
import { ClassValidatorError } from '@core/application/shared/errors/class-validator.error';
import { ExceptionFilter, Catch } from '@nestjs/common';

@Catch(ClassValidatorError)
export class ValidationPipeErrorFilter implements ExceptionFilter {
  async catch(exception: ClassValidatorError) {
    if (process.env.ENVIRONMENT !== 'production') {
      ErrorLog.log(this.constructor.name, exception);
    }
  }
}
