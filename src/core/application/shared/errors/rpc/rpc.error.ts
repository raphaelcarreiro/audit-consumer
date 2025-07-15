import { BaseError } from '../base.error';

type RpcErrorOptions = {
  disableRetryHandling?: boolean;
};

export class RpcError extends BaseError {
  public readonly context = 'customer-connector';

  constructor(
    public message: string,
    public code: string,
    public statusCode: number,
    public options: RpcErrorOptions,
  ) {
    super(message, statusCode);
    this.name = 'RpcError';
  }

  public toJSON() {
    return {
      code: `${this.context}/${this.code}`,
      statusCode: this.statusCode,
      detail: this.message,
    };
  }
}
