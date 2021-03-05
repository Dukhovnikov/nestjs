import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';
import { ContainerDto } from 'src/containers/container.dto';
import { ActionDto } from '../actions/action.dto';
import { ProfileDto } from '../userprofile/userprofile.dto';
import { CountryDto } from '../countries/country.dto';

export interface DepoModel extends Document {
  title: string;
  address: string;
  depoNo: string;
  phone: string;
  email: string;
  openingAt: Date | string;
  closingAt: Date | string;
  actions: ActionDto[] | ObjectId[] | string[];
  userprofiles: ProfileDto[] | ObjectId[] | string[];
  country: CountryDto | ObjectId | string;
  containers: ContainerDto[] | ObjectId[] | string[];
}
