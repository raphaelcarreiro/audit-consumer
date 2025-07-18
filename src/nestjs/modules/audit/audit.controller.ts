import { AuditConsumerUseCase } from '@core/application/audit/audit-consumer.usecase';
import { KAFKA_TOPICS } from '@core/infra/shared/kafka/constants';
import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuditController {
  constructor(
    @Inject('AuditConsumerUseCase')
    private readonly usecase: AuditConsumerUseCase,
  ) {}

  @MessagePattern(KAFKA_TOPICS.audit)
  async handle(@Payload() payload: any) {
    await this.usecase.execute(payload);
  }
}
