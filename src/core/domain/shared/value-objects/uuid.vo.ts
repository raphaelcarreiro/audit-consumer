import { ValueObjectAbsctract } from './value-object';
import { InvalidEntityIdError } from '../errors/invalid-entity-id.error';
import { v4, validate } from 'uuid';

export class Uuid extends ValueObjectAbsctract<string> {
  constructor(id?: string) {
    super(id ?? v4());

    if (id) {
      this.validate(id);
    }
  }

  private validate(id: string) {
    if (!validate(id)) {
      throw new InvalidEntityIdError('Invalid id. It must be a valid UUID');
    }
  }
}
