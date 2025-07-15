import { AuditConsumerApplication } from '@core/application/audit/audit-consumer.application';
import { KAFKA_TOPICS } from '@core/infra/shared/kafka/constants';
import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuditController {
  constructor(
    @Inject('AuditConsumerApplication')
    private readonly auditConsumerApplication: AuditConsumerApplication,
  ) {}

  @MessagePattern(KAFKA_TOPICS.audit)
  async handle(@Payload() payload: any) {
    await this.auditConsumerApplication.execute(payload);
  }
}
