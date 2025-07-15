import { MappingProperty, PropertyName } from '@elastic/elasticsearch/lib/api/types';

export const auditSchemaMappingProps: Record<PropertyName, MappingProperty> = {
  correlation_id: {
    type: 'keyword',
  },
  start: {
    type: 'date',
    format: 'yyyy-MM-dd HH:mm:ss',
  },
  type: {
    type: 'text',
  },
  distributor_id: {
    type: 'integer',
  },
  sellerName: {
    type: 'text',
  },
  storeName: {
    type: 'text',
  },
  route: {
    type: 'text',
  },
  input: {
    type: 'text',
  },
  output: {
    type: 'text',
  },
  end: {
    type: 'date',
    format: 'yyyy-MM-dd HH:mm:ss',
  },
  success: {
    type: 'boolean',
  },
  duration: {
    type: 'long',
  },
  headers: {
    type: 'text',
  },
  retrySequence: {
    type: 'integer',
  },
  storeId: {
    type: 'integer',
  },
  interaction_quantity: {
    type: 'integer',
  },
};
