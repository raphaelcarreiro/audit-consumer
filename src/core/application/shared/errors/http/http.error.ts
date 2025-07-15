import { BaseError } from '../base.error';

export class HttpError extends BaseError {
  public readonly context = 'customer-connector';

  constructor(
    public message: string,
    public code: string,
    public statusCode: number,
  ) {
    super(message, statusCode);
    this.name = 'HttpError';
  }

  public toJSON() {
    return {
      code: `${this.context}/${this.code}`,
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}
