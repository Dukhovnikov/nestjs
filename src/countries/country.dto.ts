import { ApiProperty } from '@nestjs/swagger';
import { DeposDto } from '../depos/depos.dto';
import { ObjectId } from 'mongodb';
import { UserDto } from '../shared/user.dto';

export class CountryDto {
  @ApiProperty()
  _id?: ObjectId | string;

  @ApiProperty()
  id?: ObjectId | string;

  @ApiProperty()
  name?: string;

  @ApiProperty()
  countryCode?: string;

  @ApiProperty({ type: [DeposDto] })
  depos?: DeposDto[] | ObjectId[] | string[];

  @ApiProperty({ type: [UserDto] })
  users?: UserDto[] | ObjectId[] | string[];

  @ApiProperty()
  createdAt?: Date | string;

  @ApiProperty()
  updatedAt?: Date | string;
}
