import { Offer } from '../../../types/offer.type.js';
import { HousingType } from '../../../types/housing-type.enum.js';

export class UpdateOfferDto implements Partial<Offer> {
  public title?: string;
  public description?: string;
  public postDate?: Date;
  public previewImage?: string;
  public images?: string[];
  public isPremium?: boolean;
  public isFavorite?: boolean;
  public rating?: number;
  public type?: HousingType;
  public bedrooms?: number;
  public maxAdults?: number;
  public price?: number;
  public goods?: string[];
}
