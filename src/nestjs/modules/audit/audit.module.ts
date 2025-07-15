import { Module } from '@nestjs/common';
import { KafkaModule } from '../kafka/kafka.module';
import AuditRepository from '@core/infra/audit/db/elastic-search/audit.repository';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ElasticSearchModule } from '../elastic/elastic-search.module';
import { AuditConsumerApplication } from '@core/application/audit/audit-consumer.application';
import { AuditController } from './audit.controller';

@Module({
  imports: [KafkaModule, ElasticSearchModule],
  providers: [
    {
      provide: 'AuditRepository',
      useFactory: client => new AuditRepository(client),
      inject: [ElasticsearchService],
    },
    {
      provide: 'AuditConsumerApplication',
      useFactory: repository => new AuditConsumerApplication(repository),
      inject: ['AuditRepository'],
    },
  ],
  controllers: [AuditController],
  exports: ['AuditRepository', 'AuditConsumerApplication'],
})
export class AuditModule {}
