import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import { v4 as uuid } from 'uuid';

export abstract class Message {
  abstract readonly destination: string;

  protected key: string;
  protected content: any;
  protected headers: Record<string, any>;

  constructor() {
    this.key = uuid();
  }

  abstract setKey(...args: any[]): void;

  setContent(content: any): void {
    this.content = content;
  }

  setHeaders(headers: Record<string, any>): void {
    this.headers = headers;
  }

  toKafka() {
    const headers = pickBy(this.headers, identity);

    return {
      key: this.key,
      headers,
      value: JSON.stringify(this.content),
    };
  }
}
