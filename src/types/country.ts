import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { DeposDto } from '../depos/depos.dto';
import { UserDto } from '../shared/user.dto';

export interface CountryModel extends Document {
  name: string;
  countryCode: string;
  depos: DeposDto[] | ObjectId[] | string[];
  users: UserDto[] | ObjectId[] | string[];
  createdAt: Date | string;
  updatedAt: Date | string;
}
