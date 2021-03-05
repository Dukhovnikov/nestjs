import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../shared/user.dto';
import { ActionDto } from '../actions/action.dto';
import { DeposDto } from '../depos/depos.dto';
import { ObjectId } from 'mongodb';

export class ProfileDto {
  @ApiProperty()
  id?: string;

  @ApiProperty()
  user?: UserDto | ObjectId | string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  displayName: string;

  @ApiProperty()
  avatarUrl: string;

  @ApiProperty()
  openid: string;

  @ApiProperty()
  unionid?: string;

  @ApiProperty()
  nickName: string;

  @ApiProperty()
  gender: string;

  @ApiProperty()
  language: string;

  @ApiProperty()
  userTranslate: string;

  @ApiProperty()
  city: string;

  @ApiProperty()
  province: string;

  @ApiProperty()
  country: string;

  @ApiProperty({ type: [ActionDto] })
  actions: ActionDto[] | ObjectId[] | string[];

  @ApiProperty({ type: DeposDto })
  depo: DeposDto | ObjectId | string;

  @ApiProperty()
  blocked: boolean;

  @ApiProperty()
  email: string;
}

export class CreateProfileDto {
  @ApiProperty({ required: true })
  user: string;

  @ApiProperty()
  firstName?: string;

  @ApiProperty()
  lastName?: string;

  @ApiProperty()
  displayName?: string;

  @ApiProperty()
  avatarUrl?: string;

  @ApiProperty()
  openid?: string;

  @ApiProperty()
  unionid?: string;

  @ApiProperty()
  nickName?: string;

  @ApiProperty()
  gender?: string;

  @ApiProperty()
  language?: string;

  @ApiProperty()
  userTranslate?: string;

  @ApiProperty()
  city?: string;

  @ApiProperty()
  province?: string;

  @ApiProperty()
  country?: string;

  @ApiProperty()
  actions?: string[];

  @ApiProperty()
  depo?: string;

  @ApiProperty()
  blocked?: boolean;

  @ApiProperty()
  email?: string;
}

export class WeChatProfileDto extends ProfileDto {
  @ApiProperty()
  token: string;
}

export class WeChatCode {
  @ApiProperty({ required: true })
  code: string;
}
