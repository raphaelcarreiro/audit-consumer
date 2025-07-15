import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ElasticsearchModule as DefaultElasticSearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DefaultElasticSearchModule.register({
      node: process.env.ELASTICSEARCH_HOST,
      auth: {
        username: `${process.env.ELASTICSEARCH_USERNAME}`,
        password: `${process.env.ELASTICSEARCH_PASSWORD}`,
      },
    }),
  ],
  exports: [DefaultElasticSearchModule],
})
export class ElasticSearchModule {}
