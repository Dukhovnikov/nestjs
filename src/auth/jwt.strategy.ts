import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserDto } from '../shared/user.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
      algorithms: ['HS256'],
    });
  }

  async validate(payload: any): Promise<UserDto> {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }
}
