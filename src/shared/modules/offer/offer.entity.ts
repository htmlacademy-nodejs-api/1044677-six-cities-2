import { UserEntity } from '../user/user.entity.js';
import { City, HousingType, Location } from '../../types/index.js';
import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({required: true, trim: true})
  public title!: string;

  @prop({required: true, trim: true})
  public description: string;

  @prop({required: true, trim: true})
  public postDate!: Date;

  @prop({required: true, trim: true})
  public city!: City;

  @prop({required: true, trim: true})
  public previewImage!: string;

  @prop()
  public images!: string[];

  @prop({required: true, trim: true})
  public isPremium!: boolean;

  @prop({required: true, trim: true})
  public isFavorite!: boolean;

  @prop({required: true, trim: true})
  public rating!: number;

  @prop({
    type: () => String,
    enum: HousingType
  })
  public type!: HousingType;

  @prop({required: true, trim: true})
  public bedrooms: number;

  @prop({required: true, trim: true})
  public maxAdults!: number;

  @prop({required: true, trim: true})
  public price!: number;

  @prop({required: true, trim: true})
  public goods: string[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId: Ref<UserEntity>;

  @prop({default: 0})
  public commentCount: number;

  @prop({required: true, trim: true})
  public location: Location;
}

export const OfferModel = getModelForClass(OfferEntity);
