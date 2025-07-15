import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString, Max, Min } from 'class-validator';

export class KafkaEnvironmentVariables {
  @IsNotEmpty()
  @IsString()
  KAFKA_BROKERS: string;

  @IsNotEmpty()
  @IsString()
  KAFKA_CLIENT_ID: string;

  @IsNotEmpty()
  @IsString()
  KAFKA_CONSUMER_GROUP_ID: string;

  @IsNumber()
  @Min(3000)
  @Max(30000)
  KAFKA_CONSUMER_HEARTBEAT_INTERVAL_MS: number;

  @IsNumber()
  @Min(3000)
  @Max(100000)
  KAFKA_CONSUMER_SESSION_TIMEOUT_MS: number;

  @IsNotEmpty()
  @IsNumber()
  KAFKA_CONSUMER_MAX_WAIT_TIME_MS: number;

  @IsNumber()
  @Max(1)
  @Min(0)
  @Type(() => Number)
  KAFKA_CONSUMER_AUTO_TOPIC_CREATION = 1;

  @IsNumber()
  @Type(() => Number)
  KAFKA_PARTITION_CONSUMED_CONCURRENTLY: number;

  @IsNumber()
  @Type(() => Number)
  KAFKA_CONSUMER_RETRIES = 3;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  KAFKA_CONSUMER_MAX_BYTES: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  KAFKA_CONSUMER_MIN_BYTES: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  KAFKA_CONSUMER_MAXBYTESPERPARTITION: number;

  @IsNotEmpty()
  @IsString()
  AUDIT_KAFKA_TOPIC: string;

  @IsNotEmpty()
  @IsString()
  AUDIT_KAFKA_RETRY_TOPIC: string;
}
