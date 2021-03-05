import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { IsBoolean, IsOptional } from 'class-validator';
import { ObjectId } from 'mongodb';
import { ProfileDto } from '../userprofile/userprofile.dto';
import { RolesDto } from '../roles/roles.dto';
import { CountryDto } from '../countries/country.dto';

export class UserDto {
  @ApiProperty()
  _id?: string | ObjectId;

  @ApiProperty({ default: false })
  @IsBoolean()
  @IsOptional()
  confirmed?: boolean;

  @ApiProperty({ default: false })
  @IsBoolean()
  @IsOptional()
  blocked?: boolean;

  @ApiProperty()
  email?: string;

  @ApiProperty()
  username?: string;

  @Exclude()
  password?: string;

  @ApiProperty()
  @IsOptional()
  provider?: string;

  @ApiProperty({ type: Date })
  createdAt?: Date | string;

  @ApiProperty({ type: Date })
  updatedAt?: Date | string;

  @ApiProperty()
  role?: RolesDto | ObjectId | string;

  @ApiProperty()
  @IsOptional()
  userprofile?: ObjectId | ProfileDto | string;

  @ApiProperty()
  @IsOptional()
  country?: CountryDto | ObjectId | string;
}

export class UpdateUserDto {
  @ApiProperty()
  _id: string;

  @ApiProperty({ default: false })
  @IsBoolean()
  @IsOptional()
  confirmed: boolean;

  @ApiProperty({ default: false })
  @IsBoolean()
  @IsOptional()
  blocked: boolean;

  @ApiProperty()
  email: string;

  @ApiProperty()
  username: string;

  @Exclude()
  password: string;

  @ApiProperty()
  @IsOptional()
  provider: string;

  @ApiProperty({ type: Date })
  createdAt: Date | string;

  @ApiProperty({ type: Date })
  updatedAt: Date | string;

  @ApiProperty()
  role: any;

  @ApiProperty()
  @IsOptional()
  userprofile?: string | ObjectId;

  @ApiProperty()
  @IsOptional()
  country?: any;
}
