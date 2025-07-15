import { Module } from '@nestjs/common';
import { KafkaModule } from '../kafka/kafka.module';
import { MessageBroker } from '@core/infra/message-broker/kafka/kafka-message-broker';

@Module({
  imports: [KafkaModule],
  providers: [
    {
      provide: 'Messenger',
      useFactory: producer => new MessageBroker(producer),
      inject: ['KafkaProducer'],
    },
  ],
  exports: ['Messenger'],
})
export class MessengerModule {}
