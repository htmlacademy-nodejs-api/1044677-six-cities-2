import { City } from '../../../types/cities.enum.js';
import { Location } from '../../../types/location.type.js';
import { HousingType } from '../../../types/housing-type.enum.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public postDate: Date;
  public city: City;
  public previewImage: string;
  public images: string[];
  public isPremium: boolean;
  public isFavorite: boolean;
  public rating: number;
  public type: HousingType;
  public bedrooms: number;
  public maxAdults: number;
  public price: number;
  public goods: string[];
  public userId: string;
  public location: Location;
}
