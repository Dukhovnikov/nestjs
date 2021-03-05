import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';
import { ActionDto } from '../actions/action.dto';
import { DeposDto } from '../depos/depos.dto';

export interface ContainerModel extends Document {
  containerNo: string;
  status: string;
  actions: ActionDto[] | ObjectId[] | string[];
  depo: DeposDto | ObjectId | string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface Container {
  _id: ObjectId | string;
  containerNo: string;
  status: string;
  actions: ObjectId[] | string[];
  depo: ObjectId | string;
  createdAt?: Date | string;
  updatedAt?: Date | string;
}
