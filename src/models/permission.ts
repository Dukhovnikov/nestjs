import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

export const PermissionSchema = new mongoose.Schema({
  id: ObjectId,
  type: String,
  controller: String,
  action: String,
  enabled: Boolean,
  policy: String,
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
