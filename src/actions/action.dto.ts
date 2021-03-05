import { ApiProperty } from '@nestjs/swagger';
import { ContainerDto } from '../containers/container.dto';
import { ObjectId } from 'mongodb';
import { DeposDto } from '../depos/depos.dto';
import { ProfileDto } from '../userprofile/userprofile.dto';
import { FileDto } from '../upload/file.dto';

export class ActionDto {
  @ApiProperty({ type: FileDto })
  shortDoor?: FileDto | ObjectId | string;

  @ApiProperty({ type: FileDto })
  longRight?: FileDto | ObjectId | string;

  @ApiProperty({ type: FileDto })
  shortWithoutDoor?: FileDto | ObjectId | string;

  @ApiProperty({ type: FileDto })
  longLeft?: FileDto | ObjectId | string;

  @ApiProperty({ type: FileDto })
  roof?: FileDto | ObjectId | string;

  @ApiProperty()
  hasDamage?: boolean;

  @ApiProperty()
  hasScratches?: boolean;

  @ApiProperty()
  hasHoles?: boolean;

  @ApiProperty()
  hasRust?: boolean;

  @ApiProperty()
  defects?: FileDto[] | ObjectId[] | string[];

  @ApiProperty()
  type?: string;

  @ApiProperty({ type: ContainerDto })
  container?: ObjectId | ContainerDto | string;

  @ApiProperty()
  step?: number;

  @ApiProperty({ type: DeposDto })
  depo?: DeposDto | ObjectId | string;

  @ApiProperty()
  finished?: boolean;

  @ApiProperty()
  inRepair?: boolean;

  @ApiProperty({ type: ProfileDto })
  userprofile?: ProfileDto | ObjectId | string;
}
