import { Injectable } from '@nestjs/common';
import { UserService } from '../shared/user.service';
import { JwtPayload } from './jwt.payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(user: JwtPayload) {
    return this.jwtService.sign(user);
  }

  async validateUser(payload: JwtPayload) {
    return await this.userService.findByEmail(payload);
  }
}
