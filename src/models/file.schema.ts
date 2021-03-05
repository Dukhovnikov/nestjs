import * as mongoose from 'mongoose';
import { ObjectId } from 'mongodb';

export const FileSchema = new mongoose.Schema({
  id: ObjectId,
  name: String,
  alternativeText: String,
  caption: String,
  hash: String,
  ext: String,
  mime: String,
  size: Number,
  width: Number,
  height: Number,
  url: String,
  formats: Map,
  previewUrl: String,
  provider: {
    type: String,
    default: 'local',
  },
  provider_metadata: Map,
  related: [Map],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});
