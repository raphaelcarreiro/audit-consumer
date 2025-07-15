import { BaseError } from '@core/application/shared/errors/base.error';
import { HttpError } from '@core/application/shared/errors/http/http.error';
import { OnConsumerError } from '@core/application/shared/on-consumer-error';
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { KafkaContext } from '@nestjs/microservices';
import { Response } from 'express';
import { KafkaMessage } from 'kafkajs';

@Catch()
export class ErrorFilter extends OnConsumerError implements ExceptionFilter {
  async catch(exception: Error, host: ArgumentsHost) {
    this.logger.error(this.constructor.name, exception);

    if (exception instanceof HttpError) {
      this.onHttpError(exception, host);
      return;
    }

    await this.onRpcError(exception, host);
  }

  protected async shouldRetry(error: Error, message: KafkaMessage): Promise<boolean> {
    const maxRetries = 3;

    if (this.isInternalError(error)) {
      return false;
    }

    if (await this.shouldAlwaysRetry()) {
      return true;
    }

    if (this.getRetryCounter(message) >= maxRetries) {
      return false;
    }

    if (error instanceof BaseError) {
      return this.shouldRetryOnStatusCode(error);
    }

    return false;
  }

  shouldRetryOnStatusCode(error: BaseError) {
    if (!error.statusCode) {
      return true;
    }

    if (error.statusCode > 499) {
      return true;
    }

    return false;
  }

  async shouldAlwaysRetry() {
    const setting = false;

    if (setting === null) {
      return true;
    }

    return setting;
  }

  isInternalError(error: Error) {
    if (error instanceof BaseError) {
      return false;
    }

    return true;
  }

  async onRpcError(error: Error, host: ArgumentsHost) {
    const context = host.switchToRpc().getContext<KafkaContext>();
    const message = context.getMessage();

    await this.handle(error, message);
  }

  onHttpError(error: HttpError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<Response>();

    response.status(error.statusCode).json(error.toJSON());
  }
}
