import { inspect } from 'util';
import { BaseError } from './errors/base.error';

export class ErrorLog {
  static log(name: string, error: BaseError) {
    console.log(`[${name}] - \x1b[31m ${error.stack} \x1b[0m`);

    console.log(
      '[ExceptionJSON]',
      inspect(error.toJSON(), {
        showHidden: false,
        depth: null,
        colors: true,
      }),
    );
  }
}
