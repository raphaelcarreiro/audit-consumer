import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions } from '@nestjs/microservices';
import { KafkaTransportStrategy } from './modules/kafka/kafka-transport-strategy';

export async function connectMicroservice(app: INestApplication) {
  const configService = app.get(ConfigService);

  const allowAutoTopicCreation = !!parseInt(configService.get('KAFKA_CONSUMER_AUTO_TOPIC_CREATION') as string);
  const heartbeatInterval = parseInt(configService.get('KAFKA_CONSUMER_HEARTBEAT_INTERVAL_MS') as string);
  const retries = parseInt(configService.get('KAFKA_CONSUMER_RETRIES') as string);

  app.connectMicroservice<MicroserviceOptions>(
    {
      strategy: new KafkaTransportStrategy({
        client: {
          brokers: configService.get('KAFKA_BROKERS').split(','),
          clientId: configService.get('KAFKA_CLIENT_ID'),
        },
        consumer: {
          groupId: `${configService.get('KAFKA_CONSUMER_GROUP_ID')}`,
          allowAutoTopicCreation,
          heartbeatInterval,
          retry: {
            retries,
          },
        },
      }),
    },
    { inheritAppConfig: true },
  );

  app.startAllMicroservices();
}
