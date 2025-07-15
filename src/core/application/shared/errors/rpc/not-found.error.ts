import { RpcError } from './rpc.error';

type ConstructorProps = {
  message: string;
  code: string;
  statusCode: number;
  disableRetryHandling?: boolean;
};

export class NotFoundError extends RpcError {
  public disableRetryHandling: boolean;

  constructor(props: ConstructorProps) {
    super(props.message, props.code, props.statusCode, {
      disableRetryHandling: props.disableRetryHandling,
    });

    this.code = props.code ?? 'not_found';
    this.statusCode = props.statusCode ?? 404;
    this.disableRetryHandling = props.disableRetryHandling ?? false;
  }
}
