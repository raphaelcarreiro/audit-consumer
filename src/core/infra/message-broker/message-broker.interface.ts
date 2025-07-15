import { Message } from './message';

export interface IMessenger {
  send(message: Message): Promise<void>;
  sendMany(messages: Message[]): Promise<void>;
}
