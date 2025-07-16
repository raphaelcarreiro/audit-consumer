import { EntityAbstract } from '../shared/entity';
import { AuditProps } from './audit';
import { AuditId } from './audit-id';

export class Audit extends EntityAbstract {
  id: AuditId;
  user_id: string | null;
  route: string;
  route_name: string | null;
  request: string;
  response: string;
  status: string;
  created_at: Date;
  started_at: Date;
  finished_at: Date;
  application_name: string;
  duration: number;

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
    this.started_at = payload.started_at;
    this.finished_at = payload.finished_at;
    this.application_name = payload.application_name;
    this.duration = payload.duration;
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
      started_at: this.started_at.toISOString(),
      finished_at: this.finished_at.toISOString(),
      application_name: this.application_name,
      duration: this.duration,
    };
  }
}
