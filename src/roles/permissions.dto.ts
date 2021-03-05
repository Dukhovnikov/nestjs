import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { RolesDto } from './roles.dto';

export class PermissionsDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  type: string;

  @ApiProperty()
  controller: string;

  @ApiProperty()
  action: string;

  @ApiProperty()
  enabled: boolean;

  @ApiProperty()
  policy: string;

  @ApiProperty()
  role: RolesDto[] | ObjectId[] | string[];

  @ApiProperty()
  createdAt: Date | string;

  @ApiProperty()
  updatedAt: Date | string;
}
