import { ValueObjectAbsctract } from './value-objects/value-object';

export abstract class EntityAbstract {
  abstract id: ValueObjectAbsctract<string>;
  abstract toJSON(): any;
}
