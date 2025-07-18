import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KAFKA_TOPICS, START_RESUME_TOPICS_KEY } from '@core/infra/shared/kafka/constants';
import { AuditConsumerUseCase } from '@core/application/audit/audit-consumer.usecase';

@Controller()
export class RetriesController {
  constructor(
    @Inject('AuditConsumerUseCase')
    private readonly usecase: AuditConsumerUseCase,
  ) {}

  @MessagePattern(KAFKA_TOPICS.audit_retry, { [START_RESUME_TOPICS_KEY]: true })
  async handle(@Payload() payload: any) {
    await this.usecase.execute(payload);
  }
}
