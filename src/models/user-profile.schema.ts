import * as mongoose from 'mongoose';

export const UserProfileSchema = new mongoose.Schema({
  confirmed: { type: Boolean, default: false },
  firstName: String,
  lastName: String,
  displayName: String,
  avatarUrl: String,
  openid: String,
  nickName: String,
  gender: String,
  language: { type: String, default: 'cn' },
  userTranslate: String,
  city: String,
  province: String,
  country: String,
  email: String,
  blocked: { type: Boolean, default: false },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
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
