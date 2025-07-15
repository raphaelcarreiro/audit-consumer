import { Module, Scope } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './filters/error.filter';
import { LoggerModule } from '../logger/logger.module';
import { MessengerModule } from '../messenger/messenger.module';

@Module({
  imports: [MessengerModule, LoggerModule],
  providers: [
    {
      provide: APP_FILTER,
      useFactory: (broker, logger) => new ErrorFilter(broker, logger),
      scope: Scope.REQUEST,
      inject: ['Messenger', 'Logger'],
    },
  ],
})
export class SharedModule {}
