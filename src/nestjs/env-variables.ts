import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

enum EnvironmentEnum {
  Production = 'production',
  Homologation = 'homologation',
  Local = 'local',
}

export class EnvVariables {
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  PORT: number;

  @IsString()
  @IsEnum(EnvironmentEnum)
  ENVIRONMENT: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1)
  @Type(() => Number)
  KAFKAJS_NO_PARTITIONER_WARNING: number;
}
