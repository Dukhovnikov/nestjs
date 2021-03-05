import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { UserDto } from '../shared/user.dto';
import { PermissionsDto } from './permissions.dto';

export class RolesDto {
  @ApiProperty()
  _id?: ObjectId | string;

  @ApiProperty()
  id?: ObjectId | string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  permissions?: PermissionsDto[] | ObjectId[] | string[];

  @ApiProperty()
  users?: UserDto[] | ObjectId[] | string[];

  @ApiProperty({ type: Date })
  createdAt: Date | string;

  @ApiProperty({ type: Date })
  updatedAt: Date | string;
}

export class CreateRolesDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  type?: string;

  @ApiProperty()
  permissions?: string[];

  @ApiProperty()
  users?: string[];
}

export class UpdateRolesDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  type?: string;

  @ApiProperty()
  permissions?: string[];

  @ApiProperty()
  users?: string[];
}
