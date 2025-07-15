import { Module } from '@nestjs/common';
import { HealthController } from './modules/health/health.controller';
import { AuditModule } from './modules/audit/audit.module';
import { SharedModule } from './modules/shared/shared.module';
import { RetryModule } from './modules/retry/retry.module';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.validation';
import { EnvVariables } from './env-variables';

@Module({
  imports: [
    RetryModule,
    AuditModule,
    SharedModule,
    ConfigModule.forRoot({
      validate: config =>
        validate({
          config,
          variablesClass: EnvVariables,
          errorMessage: 'environment variables validation has failed',
        }),
    }),
  ],
  controllers: [HealthController],
})
export class AppModule {}
