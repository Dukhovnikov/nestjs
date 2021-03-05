import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

export const CountrySchema = new mongoose.Schema({
  id: ObjectId,
  name: String,
  countryCode: String,
  depos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Depo',
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
