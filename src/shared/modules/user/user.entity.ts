import { User } from '../../types/index.js';
import { getModelForClass, prop } from '@typegoose/typegoose';

export class UserEntity implements User {
  @prop({ required: true })
  public name: string;

  @prop({ unique: true, required: true })
  public email: string;

  @prop({ required: true, default: '' })
  public avatarPath: string;

  @prop({ required: true })
  public password: string;

  @prop({ required: true })
  public isPro: boolean;
}

export const UserModel = getModelForClass(UserEntity);
