import { BaseError } from '@core/application/shared/errors/base.error';
import { ILogger } from './logger.interface';
import { inspect } from 'util';

type Level = 'info' | 'error';

export class TextLogger implements ILogger {
  private readonly colors = { white: '\x1b[37m', green: '\x1b[32m', red: '\x1b[31m', yellow: '\x1b[33m' };

  log(context: string, message: string) {
    this.print(this.context(context), this.date(), this.message(message, 'info'), 'info');
  }

  error(context: string, error: Error) {
    const message = this.getErrorMessage(error);

    this.print(this.context(context), this.date(), this.message(message, 'error'), 'error');

    if (error instanceof BaseError) {
      console.log(
        inspect(error.toJSON(), {
          showHidden: false,
          depth: null,
          colors: true,
        }),
      );
    }
  }

  private getErrorMessage(error: Error | string) {
    return error instanceof Error ? (error.stack ?? error.message) : error;
  }

  private context(value: string) {
    return `${this.colors.yellow}[${value}]`;
  }

  private date() {
    return `${this.colors.white}${new Date().toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    })}    `;
  }

  private message(value: string, level: Level = 'info') {
    const options = { error: this.colors.red, info: this.colors.green };

    return `${options[level]}${value}${this.colors.white}`;
  }

  private print(context: string, date: string, message: string, level: Level) {
    const provider = `${this.colors.green}[Logg] ${process.pid}  -${this.colors.white}`;

    console.log(provider, date, `${level.toUpperCase()} ${context}`, message);
  }
}
