import { ISessionHandler } from '@core/infra/session/session-handler.interface';
import { ILogger } from './logger.interface';
import { BaseError } from '@core/application/shared/errors/base.error';

type Level = 'info' | 'error';

export class JsonLogger implements ILogger {
  log(context: string, message: string) {
    this.print(this.context(context), this.date(), this.message(message, 'info'), 'info');
  }

  error(context: string, error: Error | string) {
    const message = this.getErrorMessage(error);

    this.print(this.context(context), this.date(), this.message(message, 'error'), 'error');

    if (error instanceof BaseError) {
      this.print(this.context(context), this.date(), JSON.stringify(error.toJSON()), 'error');
    }
  }

  private getErrorMessage(error: Error | string) {
    return error instanceof Error ? (error.stack ?? error.message) : error;
  }

  private context(value: string) {
    return value;
  }

  private date() {
    return new Date().toLocaleString('pt-BR');
  }

  private message(value: string, level: Level = 'info') {
    return `${level.toLocaleUpperCase()} ${value}`;
  }

  private print(context: string, date: string, message: string, level: Level) {
    console.log(
      JSON.stringify({
        context,
        date,
        message,
        level,
      }),
    );
  }
}
