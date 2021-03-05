import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from './user.dto';

export const GetUser = createParamDecorator<UserDto>(
  (data: unknown, context: ExecutionContext): UserDto => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
