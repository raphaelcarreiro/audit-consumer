import { IsNotEmpty, IsString } from 'class-validator';

export class ElasticEnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  ELASTICSEARCH_HOST: string;

  @IsNotEmpty()
  @IsString()
  ELASTICSEARCH_USERNAME: string;

  @IsNotEmpty()
  @IsString()
  ELASTICSEARCH_PASSWORD: string;

  @IsNotEmpty()
  @IsString()
  ELASTICSEARCH_AUDIT_INDEX: string;
}
