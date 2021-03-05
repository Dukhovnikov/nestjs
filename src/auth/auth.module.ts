import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UserController } from './user.controller';

@Module({
  controllers: [AuthController, UserController],
  imports: [
    SharedModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN.toString(),
        algorithm: 'HS256',
      },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
