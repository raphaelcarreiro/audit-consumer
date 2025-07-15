import { AuditId } from './audit-id';

export type AuditProps = {
  id: AuditId;
  user_id: string;
  route: string;
  route_name: string | null;
  created_at: Date;
  request: string;
  response: string;
  status: string;
};
