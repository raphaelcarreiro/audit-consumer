import { EntityIdVo } from './value-objects/entity-id.vo';

export abstract class EntityAbstract {
  abstract id: EntityIdVo;
  abstract toJSON(): any;
}
