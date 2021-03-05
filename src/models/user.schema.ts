import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

export const UserSchema = new mongoose.Schema({
  id: ObjectId,
  confirmed: { type: Boolean, default: false },
  blocked: { type: Boolean, default: false },
  username: String,
  password: { type: String, select: false },
  email: String,
  provider: { type: String, default: 'local' },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
  },
  userprofile: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserProfile',
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
  },
});

UserSchema.pre('save', async function(next: mongoose.HookNextFunction) {
  try {
    if (!this.isModified('password')) {
      return next();
    }
    this['password'] = await bcrypt.hash(this['password'], 10);
    return next();
  } catch (e) {
    return next(e);
  }
});
