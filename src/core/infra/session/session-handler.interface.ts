import { Session } from './session';

export interface ISessionHandler {
  get(): Session;
  save(session: Session): void;
}
