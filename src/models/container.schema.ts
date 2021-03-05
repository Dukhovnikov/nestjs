import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

export const ContainerSchema = new mongoose.Schema({
  id: ObjectId,
  containerNo: String,
  status: String,
  actions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Action',
    },
  ],
  depo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Depo',
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
