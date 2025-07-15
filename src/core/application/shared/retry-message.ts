import { Message } from '@core/infra/message-broker/message';
import { KAFKA_TOPICS } from '@core/infra/shared/kafka/constants';

export class RetryMessage extends Message {
  destination = KAFKA_TOPICS.audit_retry as string;

  setKey(key: string): void {
    this.key = key;
  }
}
