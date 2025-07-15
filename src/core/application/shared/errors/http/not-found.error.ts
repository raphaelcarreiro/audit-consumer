import { HttpError } from './http.error';

type ConstructorProps = {
  message: string;
  code: string;
  statusCode: number;
};

export class NotFoundError extends HttpError {
  constructor(props: ConstructorProps) {
    super(props.message, props.code, props.statusCode);

    this.code = props.code ?? 'not_found';
    this.statusCode = props.statusCode ?? 404;
  }
}
