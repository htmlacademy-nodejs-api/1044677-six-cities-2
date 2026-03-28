import { UserEntity } from '../user/user.entity.js';
import { City, HousingType } from '../../types/index.js';
import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';

@modelOptions({
  schemaOptions: {
    _id: false,
  },
})
export class OfferLocation {
  @prop({ required: true })
  public latitude!: number;

  @prop({ required: true })
  public longitude!: number;
}

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

  @prop({required: true})
  public description: string;

  @prop({required: true})
  public postDate!: Date;

  @prop({required: true})
  public city!: City;

  @prop({required: true})
  public previewImage!: string;

  @prop({ required: true, type: () => [String] })
  public images!: string[];

  @prop({required: true})
  public isPremium!: boolean;

  @prop({required: true})
  public isFavorite!: boolean;

  @prop({required: true})
  public rating!: number;

  @prop({
    type: () => String,
    enum: HousingType
  })
  public type!: HousingType;

  @prop({required: true})
  public bedrooms: number;

  @prop({required: true})
  public maxAdults!: number;

  @prop({required: true})
  public price!: number;

  @prop({ required: true, type: () => [String] })
  public goods!: string[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId: Ref<UserEntity>;

  @prop({default: 0})
  public commentCount: number;

  @prop({ required: true, type: () => OfferLocation })
  public location!: OfferLocation;
}

export const OfferModel = getModelForClass(OfferEntity);
