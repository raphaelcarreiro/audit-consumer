import { Kafka } from 'kafkajs';

export function kafkaProducerFactory() {
  const kafka = new Kafka({
    clientId: `${process.env.KAFKA_CLIENT_ID}`,
    brokers: `${process.env.KAFKA_BROKERS}`.split(','),
  });

  const producer = kafka.producer();

  producer.connect();

  return producer;
}
