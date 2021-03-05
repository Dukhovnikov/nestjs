import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

export const RoleSchema = new mongoose.Schema({
  id: ObjectId,
  name: String,
  description: String,
  type: String,
  permissions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Permission',
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
