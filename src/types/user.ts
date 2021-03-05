import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { RolesDto } from '../roles/roles.dto';
import { ProfileDto } from '../userprofile/userprofile.dto';
import { CountryDto } from '../countries/country.dto';

export interface UserModel extends Document {
  confirmed: boolean;
  blocked: boolean;
  username: string;
  password: string;
  email: string;
  provider: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  role?: RolesDto | ObjectId | string;
  userprofile?: ProfileDto | ObjectId | string;
  country?: CountryDto | ObjectId | string;
}

export interface User {
  _id: ObjectId | string;
  confirmed: boolean;
  blocked: boolean;
  email: string;
  username: string;
  password: string;
  provider: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  role: any;
  userprofile?: any;
  country?: any;
}

export interface ProfileModel extends Document {
  confirmed: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatarUrl: string;
  openid: string;
  nickName: string;
  gender: string;
  language: string;
  userTranslate: string;
  city: string;
  province: string;
  country: string;
  email: string;
  blocked: boolean;
  user: ObjectId | string;
  actions: ObjectId[] | string[];
  depo: ObjectId | string;
}
