import { ApiProperty } from '@nestjs/swagger';
import { ActionDto } from '../actions/action.dto';
import { DeposDto } from '../depos/depos.dto';
import { ObjectId } from 'mongodb';

export class ContainerDto {
  @ApiProperty()
  _id?: ObjectId | string;

  @ApiProperty()
  id?: ObjectId | string;

  @ApiProperty()
  containerNo?: string;

  @ApiProperty()
  status?: string;

  @ApiProperty({ type: [ActionDto] })
  actions?: ActionDto[] | ObjectId[] | string[];

  @ApiProperty({ type: DeposDto })
  depo?: DeposDto | ObjectId | string;

  @ApiProperty()
  createdAt?: Date | string;

  @ApiProperty()
  updatedAt?: Date | string;
}
