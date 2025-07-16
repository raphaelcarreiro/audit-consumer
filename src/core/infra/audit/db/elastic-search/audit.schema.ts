export type AuditSchema = {
  id: string;
  user_id: string | null;
  route: string;
  route_name: string | null;
  created_at: string;
  request: string;
  response: string;
  status: string;
  started_at: string;
  finished_at: string;
  application_name: string;
  duration: number;
};
