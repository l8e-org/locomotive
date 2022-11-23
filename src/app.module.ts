import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SlonikModule } from 'nestjs-slonik';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { RequestContextModule } from 'nestjs-request-context';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ContextInterceptor } from './libs/application/context/ContextInterceptor';
import { ExceptionInterceptor } from '@libs/application/interceptors/exception.interceptor';
import { postgresConnectionUri } from './configs/database.config';

const interceptors = [
  {
    provide: APP_INTERCEPTOR,
    useClass: ContextInterceptor,
  },
  {
    provide: APP_INTERCEPTOR,
    useClass: ExceptionInterceptor,
  },
];

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    RequestContextModule,
    SlonikModule.forRoot({
      connectionUri: postgresConnectionUri,
    }),
    CqrsModule,
  ],
  controllers: [],
  providers: [...interceptors],
})
export class AppModule {}
