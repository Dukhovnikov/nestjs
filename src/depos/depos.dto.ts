import { ApiProperty } from '@nestjs/swagger';
import { ActionDto } from 'src/actions/action.dto';
import { ObjectId } from 'mongodb';
import { ProfileDto } from 'src/userprofile/userprofile.dto';
import { ContainerDto } from 'src/containers/container.dto';
import { CountryDto } from '../countries/country.dto';

export class DeposDto {
  @ApiProperty()
  id?: ObjectId | string;

  @ApiProperty()
  _id?: ObjectId | string;

  @ApiProperty()
  title?: string;

  @ApiProperty()
  address?: string;

  @ApiProperty()
  depoNo?: string;

  @ApiProperty()
  phone?: string;

  @ApiProperty()
  email?: string;

  @ApiProperty({ type: Date })
  openingAt?: Date | string;

  @ApiProperty({ type: Date })
  closingAt?: Date | string;

  @ApiProperty({ type: [ActionDto] })
  actions?: ActionDto[] | ObjectId[] | string[];

  @ApiProperty({ type: () => [ProfileDto] })
  userprofiles?: ProfileDto[] | ObjectId[] | string[];

  @ApiProperty()
  country?: CountryDto | ObjectId | string;

  @ApiProperty({ type: [ContainerDto] })
  containers?: ContainerDto[] | ObjectId[] | string[];
}
