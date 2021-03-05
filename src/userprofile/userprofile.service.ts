import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProfileModel } from '../types/user';
import { FindAllQuery } from '../shared/find-query.dto';
import {
  CreateProfileDto,
  ProfileDto,
  WeChatProfileDto,
} from './userprofile.dto';
import { CountDto } from '../shared/count.dto';
import { WeChat } from '../lib/api';
import { isEmpty, isNil } from 'ramda';

@Injectable()
export class UserprofileService {
  constructor(
    @InjectModel('UserProfile') private profileModel: Model<ProfileModel>,
  ) {}

  async findAllUserProfiles(query: FindAllQuery): Promise<ProfileDto[]> {
    return this.profileModel
      .find(query.options)
      .skip(query._start)
      .sort(query._sort)
      .limit(query._limit)
      .populate('user')
      .populate('actions')
      .populate('depo');
  }

  async findProfile(id: string): Promise<ProfileDto> {
    return this.profileModel
      .findById(id)
      .populate('user')
      .populate('actions')
      .populate('depo');
  }

  async countProfile(): Promise<CountDto> {
    const count = await this.profileModel.countDocuments();
    return { count };
  }

  async createProfile(profileDto: CreateProfileDto): Promise<ProfileDto> {
    const profile = new this.profileModel(profileDto);
    await profile.save();
    return profile;
  }

  async updateProfile(
    id: string,
    profileDto: CreateProfileDto,
  ): Promise<ProfileDto> {
    await this.profileModel.findByIdAndUpdate(
      id,
      { $set: profileDto },
      { useFindAndModify: false },
    );
    return this.profileModel.findById(id);
  }

  async deleteProfile(id: string): Promise<void> {
    await this.profileModel.findByIdAndDelete(id);
  }

  async wechatAuth(code: string): Promise<WeChatProfileDto> {
    const { data } = await WeChat.weauth(code);

    if (data.errcode || data.errmsg) {
      throw new HttpException(
        `Wechat auth error: ${data?.errmsg}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const { openid = '', session_key: token } = data;
    let profile = await this.profileModel.findOne({ openid });
    if (isEmpty(profile) || isNil(profile)) {
      profile = new this.profileModel({ openid });
      await profile.save();
    }

    return { ...profile, token };
  }
}
