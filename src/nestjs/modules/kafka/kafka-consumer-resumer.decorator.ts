import { KafkaTransportStrategy } from './kafka-transport-strategy';

export function KafkaConsumerResumer() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = (...args: any[]) => {
      KafkaTransportStrategy.resume();
      return method.apply(target, args);
    };

    return descriptor;
  };
}
