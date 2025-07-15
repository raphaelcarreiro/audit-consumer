import { Module } from '@nestjs/common';
import { AuditModule } from '../audit/audit.module';
import { RetriesController } from './retries.controller';
import { KafkaModule } from '../kafka/kafka.module';

@Module({
  imports: [AuditModule, KafkaModule],
  controllers: [RetriesController],
})
export class RetryModule {}
