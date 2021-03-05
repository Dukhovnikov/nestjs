import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../models/user.schema';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpExceptionsFilter } from './http-exceptions.filter';
import { LoggingInterceptor } from './logging.interceptor';

@Module({
  providers: [
    UserService,
    {
      provide: APP_FILTER,
      useClass: HttpExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
  exports: [UserService],
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
})
export class SharedModule {}
