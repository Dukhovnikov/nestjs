import * as mongoose from 'mongoose';

export const ActionSchema = new mongoose.Schema({
  shortDoor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FileUpload',
  },
  longRight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FileUpload',
  },
  shortWithoutDoor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FileUpload',
  },
  longLeft: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FileUpload',
  },
  roof: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'FileUpload',
  },
  hasDamage: Boolean,
  hasScratches: Boolean,
  hasHoles: Boolean,
  hasRust: Boolean,
  defects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FileUpload',
    },
  ],
  type: String,
  container: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Container',
  },
  step: Number,
  depo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Depo',
  },
  finished: Boolean,
  inRepair: Boolean,
  userprofile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile',
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
