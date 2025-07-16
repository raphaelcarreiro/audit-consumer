import { AuditId } from './audit-id';

export type AuditProps = {
  id: AuditId;
  user_id: string | null;
  route: string;
  route_name: string | null;
  created_at: Date;
  request: string;
  response: string;
  status: string;
  started_at: Date;
  finished_at: Date;
  application_name: string;
  duration: number;
};
