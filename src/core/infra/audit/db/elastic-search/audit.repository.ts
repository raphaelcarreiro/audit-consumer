import { IAuditRepository } from '../audit.repository.interface';
import { Audit } from '@core/domain/audit/audit.entity';
import { AuditMapper } from './audit.mapper';
import { ElasticSearchRepository } from '@core/infra/shared/elastic-search/elastic-search.repository';
import { auditSchemaMappingProps } from './audit-schema.mapping';

export default class AuditRepository extends ElasticSearchRepository implements IAuditRepository {
  protected index = `${process.env.ELASTICSEARCH_AUDIT_INDEX}`;
  protected mapping = auditSchemaMappingProps;
  protected indexPattern = `${this.index}-*`;

  getTodayIndex() {
    return `${this.index}-${new Date().toISOString().substring(0, 10)}`;
  }

  async save(audit: Audit): Promise<void> {
    await this.findOrCreateTodayIndex();

    const document = AuditMapper.toDocument(audit);

    await this.client.index({
      index: this.getTodayIndex(),
      document,
    });
  }
}
