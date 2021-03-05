import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '@nestjs/common';

export class JwtGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context) {
    if (err || !user) {
      throw err || new UnauthorizedException(`Unauthorized`);
    }
    return user;
  }
}
