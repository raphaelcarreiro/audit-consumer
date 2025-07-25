import { MappingProperty, PropertyName } from '@elastic/elasticsearch/lib/api/types';

export const auditSchemaMappingProps: Record<PropertyName, MappingProperty> = {
  id: {
    type: 'keyword',
  },
  created_at: {
    type: 'date',
  },
  route: {
    type: 'keyword',
  },
  route_name: {
    type: 'keyword',
  },
  request: {
    type: 'text',
  },
  response: {
    type: 'text',
  },
  status: {
    type: 'keyword',
  },
  user_id: {
    type: 'keyword',
  },
  started_at: {
    type: 'date',
  },
  finished_at: {
    type: 'date',
  },
  application_name: {
    type: 'keyword',
  },
  duration: {
    type: 'long',
  },
};
