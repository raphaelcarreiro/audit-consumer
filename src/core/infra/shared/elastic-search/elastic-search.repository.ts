import { NotFoundError } from '@core/application/shared/errors/rpc/not-found.error';
import { Client } from '@elastic/elasticsearch';
import { MappingProperty, PropertyName } from '@elastic/elasticsearch/lib/api/types';

export abstract class ElasticSearchRepository {
  protected abstract index: string;
  protected abstract indexPattern: string;
  protected abstract mapping: Record<PropertyName, MappingProperty>;

  constructor(protected readonly client: Client) {}

  protected async findOrCreateTodayIndex() {
    if (await this.checkTodayIndexExists()) {
      return;
    }

    await this.client.indices.create({
      index: this.getTodayIndex(),
      body: {
        mappings: {
          properties: this.mapping,
        },
      },
    });
  }

  protected async checkTodayIndexExists(option = { throwException: false }) {
    const exists = await this.client.indices.exists({ index: this.getTodayIndex() });

    if (!exists && option.throwException) {
      throw new NotFoundError({
        message: `index ${this.getTodayIndex()} was not found`,
        code: 'index_not_found',
        statusCode: 404,
      });
    }

    return exists;
  }

  protected getTodayIndex() {
    return `${this.index}-${new Date().toISOString().substring(0, 10)}`;
  }
}
