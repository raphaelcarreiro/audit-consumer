import { Module } from '@nestjs/common';
import { KafkaModule } from '../kafka/kafka.module';
import AuditRepository from '@core/infra/audit/db/elastic-search/audit.repository';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { ElasticSearchModule } from '../elastic/elastic-search.module';
import { AuditConsumerUseCase } from '@core/application/audit/audit-consumer.usecase';
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
      provide: 'AuditConsumerUseCase',
      useFactory: repository => new AuditConsumerUseCase(repository),
      inject: ['AuditRepository'],
    },
  ],
  controllers: [AuditController],
  exports: ['AuditRepository', 'AuditConsumerUseCase'],
})
export class AuditModule {}
