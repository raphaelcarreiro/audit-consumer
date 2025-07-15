import { KafkaMessage } from 'kafkajs';
import { KAFKA_TOPICS } from '@core/infra/shared/kafka/constants';
import { ILogger } from 'src/nestjs/modules/logger/logger.interface';
import parser from 'cron-parser';
import { IMessenger } from '@core/infra/message-broker/message-broker.interface';
import { RetryMessage } from './retry-message';
import { v4 } from 'uuid';

export abstract class OnConsumerError {
  constructor(
    protected readonly broker: IMessenger,
    protected readonly logger: ILogger,
  ) {}

  protected abstract shouldRetry(error: Error, message: KafkaMessage): Promise<boolean>;

  protected async handle(error: Error, message: KafkaMessage) {
    if (await this.shouldRetry(error, message)) {
      await this.dispatchToRetry(message);
      return;
    }
  }

  private async dispatchToRetry(message: KafkaMessage) {
    const counter = this.getNextRetryCounterValue(message);

    const _message = new RetryMessage();

    _message.setKey(v4());
    _message.setContent(message.value);
    _message.setHeaders({
      ...message.headers,
      'x-retry-counter': counter,
      'x-retry-at': await this.calculateNextRetryAt(),
    });

    await this.broker.send(_message);

    this.logger.log(this.constructor.name, `published to retry at ${KAFKA_TOPICS.audit_retry}, ${counter}x`);
  }

  private getNextRetryCounterValue(message: KafkaMessage) {
    if (!message.headers) {
      return '1';
    }

    if (!message.headers['x-retry-counter']) {
      return '1';
    }

    return (parseInt(message.headers['x-retry-counter'] as string) + 1).toString();
  }

  protected getRetryCounter(message: KafkaMessage) {
    if (!message.headers) {
      return 1;
    }

    if (!message.headers['x-retry-counter']) {
      return 1;
    }

    return parseInt(message.headers['x-retry-counter'].toString());
  }

  private async calculateNextRetryAt(): Promise<string> {
    const interval = parser.parse('0 */15 * * * *');

    const next = interval.next().toDate();

    next.setSeconds(0);
    next.setMilliseconds(0);

    return next.toISOString();
  }
}
