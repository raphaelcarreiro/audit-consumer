import { EntityAbstract } from '../shared/entity';
import { AuditProps } from './audit';
import { AuditId } from './audit-id';

export class Audit extends EntityAbstract {
  id: AuditId;
  user_id: string;
  route: string;
  route_name: string | null;
  created_at: Date;
  request: string;
  response: string;
  status: string;

  constructor(payload: AuditProps) {
    super();

    this.id = payload.id;
    this.user_id = payload.user_id;
    this.route = payload.route;
    this.route_name = payload.route_name;
    this.created_at = payload.created_at;
    this.request = payload.request;
    this.response = payload.response;
    this.status = payload.status;
  }

  private getMicrotime(date: Date): number {
    return date.getTime();
  }

  toJSON() {
    return {
      id: this.id.value,
      route: this.route,
      route_name: this.route_name,
      user_id: this.user_id,
      request: this.request,
      response: this.response,
      status: this.status,
      created_at: this.created_at.toISOString(),
    };
  }
}
