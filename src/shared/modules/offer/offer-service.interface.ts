import { OfferEntity } from './offer.entity.js';
import { City } from '../../types/cities.enum.js';
import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { HousingType } from '../../types/housing-type.enum.js';

export interface OfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findByCity(city: City): Promise<DocumentType<OfferEntity>[]>;
  findByType(type: HousingType): Promise<DocumentType<OfferEntity>[]>;
  findByPrice(price: number): Promise<DocumentType<OfferEntity>[]>;
  findByRating(rating: number): Promise<DocumentType<OfferEntity>[]>;
  findByTitle(title: string): Promise<DocumentType<OfferEntity>[]>;
  findByTitleOrCreate(offerTitle: string, dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
}
