import { ObjectId } from 'bson';
import { ValueObjectAbsctract } from './value-object';
import { InvalidEntityIdError } from '../errors/invalid-entity-id.error';

export class EntityIdVo extends ValueObjectAbsctract<string> {
  constructor(id?: string) {
    super(id ?? new ObjectId().toString());

    if (id) {
      this.validate(id);
    }
  }

  private validate(id: string) {
    if (!ObjectId.isValid(id)) {
      throw new InvalidEntityIdError('Invalid id. It must be a valid ObjectId');
    }
  }
}
