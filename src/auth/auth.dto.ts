import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsOptional } from 'class-validator';
import { UserDto } from '../shared/user.dto';

export class SignUpDto {
  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  @IsOptional()
  provider?: string;

  @ApiProperty()
  @IsOptional()
  resetPasswordToken?: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  @IsOptional()
  confirmed?: boolean;

  @ApiProperty({ default: false })
  @IsBoolean()
  @IsOptional()
  blocked?: boolean;

  @ApiProperty()
  @IsOptional()
  role?: string;

  @ApiProperty()
  @IsOptional()
  userprofile?: string;

  @ApiProperty()
  @IsOptional()
  country?: string;
}

export class SignInDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class LoggedInDto {
  @ApiProperty()
  jwt: string;

  @ApiProperty()
  user: UserDto;
}
