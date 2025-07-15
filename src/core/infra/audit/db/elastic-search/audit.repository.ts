import { IAuditRepository } from '../audit.repository.interface';
import { Audit } from '@core/domain/audit/audit.entity';
import { AuditMapper } from './audit.mapper';
import { Client } from '@elastic/elasticsearch';

export default class AuditRepository implements IAuditRepository {
  private index = `${process.env.ELASTICSEARCH_AUDIT_INDEX}`;

  constructor(private readonly client: Client) {}

  getTodayIndex() {
    return `${this.index}-${new Date().toISOString().substring(0, 10)}`;
  }

  async save(audit: Audit): Promise<void> {
    const document = AuditMapper.toDocument(audit);

    await this.client.index({
      index: this.getTodayIndex(),
      document,
    });
  }
}
