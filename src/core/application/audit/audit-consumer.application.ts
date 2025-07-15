import { AuditId } from '@core/domain/audit/audit-id';
import { Audit } from '@core/domain/audit/audit.entity';
import { IAuditRepository } from '@core/infra/audit/db/audit.repository.interface';

type Input = {
  id: string;
  user_id: string;
  route: string;
  route_name: string | null;
  created_at: string;
  request: string;
  response: string;
  status: string;
};

export class AuditConsumerApplication {
  constructor(private readonly repository: IAuditRepository) {}

  public async execute(input: Input) {
    const audit = new Audit({
      id: new AuditId(input.id),
      user_id: input.user_id,
      route: input.route,
      route_name: input.route_name,
      created_at: new Date(input.created_at),
      request: input.request,
      response: input.response,
      status: input.status,
    });

    await this.repository.save(audit);
  }
}
