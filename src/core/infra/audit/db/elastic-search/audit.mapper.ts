import { Audit } from '@core/domain/audit/audit.entity';
import { AuditSchema } from './audit.schema';
import { AuditId } from '@core/domain/audit/audit-id';

export class AuditMapper {
  static toEntity(document: AuditSchema): Audit {
    return new Audit({
      id: new AuditId(),
      user_id: document.user_id,
      route: document.route,
      route_name: document.route_name,
      created_at: new Date(document.created_at),
      request: document.request,
      response: document.response,
      status: document.status,
    });
  }

  static toDocument(entity: Audit): AuditSchema {
    return entity.toJSON();
  }
}
