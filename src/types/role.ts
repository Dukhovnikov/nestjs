import { Document } from 'mongoose';
import { ObjectId } from 'mongodb';

export interface RoleModel extends Document {
  name: string;
  description: string;
  type: string;
  permissions: ObjectId[] | string[];
  users: ObjectId[] | string[];
  createdAt: Date | string;
  updatedAt: Date | string;
}
