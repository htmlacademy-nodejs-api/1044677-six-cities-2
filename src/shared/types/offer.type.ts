import { User } from './user.type.js';
import { City } from './cities.enum.js';
import { Location } from './location.type.js';
import { HousingType } from './housing-type.enum.js';

export type Offer = {
  title: string;
  description: string;
  postDate: Date;
  city: City;
  previewImage: string;
  images: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  type: HousingType;
  bedrooms: number;
  maxAdults: number;
  price: number;
  goods: string[];
  user: User;
  location: Location;
}
