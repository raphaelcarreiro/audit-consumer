import EventEmitter2 from 'eventemitter2';
import { ApplicationEvent } from './application.event';

export class ApplicationEventDispatcher {
  constructor(private eventEmitter: EventEmitter2) {}

  async dispatch(event: ApplicationEvent) {
    await this.eventEmitter.emitAsync(event.name, event);
  }
}
