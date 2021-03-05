import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

export const DepoSchema = new mongoose.Schema({
  id: ObjectId,
  title: String,
  address: String,
  depoNo: String,
  phone: String,
  email: String,
  openingAt: {
    type: Date,
    default: Date.now,
  },
  closingAt: {
    type: Date,
    default: Date.now,
  },
  actions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Action',
    },
  ],
  userprofiles: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserProfile',
    },
  ],
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
  },
  containers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Container',
    },
  ],
});
