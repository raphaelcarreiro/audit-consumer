import { Message } from '../message';
import { IMessenger } from '../message-broker.interface';
import { CompressionTypes, Producer } from 'kafkajs';

export class MessageBroker implements IMessenger {
  constructor(private readonly producer: Promise<Producer>) {}

  async send(message: Message): Promise<void> {
    const producer = await this.producer;

    await producer.send({
      topic: message.destination,
      messages: [message.toKafka()],
    });
  }

  async sendMany(messages: Message[]): Promise<void> {
    const producer = await this.producer;

    const map = this.mapMessages(messages);

    const messagesByTopic = Array.from(map.entries()).map(([topic, messages]) => ({
      topic,
      messages: messages.map(message => message.toKafka()),
    }));

    await producer.sendBatch({
      topicMessages: messagesByTopic,
      compression: CompressionTypes.GZIP,
    });
  }

  private mapMessages(messages: Message[]) {
    const map = new Map<string, Message[]>();

    for (const message of messages) {
      if (map.has(message.destination)) {
        map.get(message.destination)?.push(message);
      } else {
        map.set(message.destination, [message]);
      }
    }
    return map;
  }
}
