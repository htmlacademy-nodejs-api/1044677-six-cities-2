import { User } from '../../types/index.js';
import { Schema, Document, model } from 'mongoose';

export interface UserDocument extends User, Document {
  createdAt: Date,
  updatedAt: Date,
}

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  avatarPath: String,
  firstname: String,
  lastname: String,
  isPro: Boolean,
}, { timestamps: true });

export const UserModel = model<UserDocument>('User', userSchema);
