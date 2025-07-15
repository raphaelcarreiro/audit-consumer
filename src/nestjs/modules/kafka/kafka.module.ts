import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from 'class-validator';
import { KafkaEnvironmentVariables } from './kafka-env-variables';
import { kafkaProducerFactory } from './kafka-producer-factory';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: config =>
        validate({
          config,
          variablesClass: KafkaEnvironmentVariables,
          errorMessage: 'kafka environment variables validation has failed',
        }),
    }),
  ],
  providers: [
    {
      provide: 'KafkaProducer',
      useFactory: kafkaProducerFactory,
    },
  ],
  exports: ['KafkaProducer'],
})
export class KafkaModule {}
