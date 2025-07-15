import { Module } from '@nestjs/common';
import { TextLogger } from './text-logger';
import { JsonLogger } from './json-logger';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'Logger',
      useFactory: config => {
        if (config.get('ENVIRONMENT') !== 'local') {
          return new JsonLogger();
        }

        return new TextLogger();
      },
      inject: [ConfigService],
    },
  ],
  exports: ['Logger'],
})
export class LoggerModule {}
