import { Audit } from '@core/domain/audit/audit.entity';

export interface IAuditRepository {
  save(audit: Audit): Promise<void>;
}
