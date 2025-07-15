export type AuditSchema = {
  id: string;
  user_id: string;
  route: string;
  route_name: string | null;
  created_at: string;
  request: string;
  response: string;
  status: string;
};
