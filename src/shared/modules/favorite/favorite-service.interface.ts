import { DocumentType } from '@typegoose/typegoose';
import { FavoriteEntity } from './favorite.entity.js';
import { OfferEntity } from '../offer/offer.entity.js';
import { CreateFavoriteDto } from './dto/create-favorite.dto.js';

export interface FavoriteService {
  create(dto: CreateFavoriteDto): Promise<DocumentType<FavoriteEntity>>;
  deleteByUserAndOffer(userId: string, offerId: string): Promise<boolean>;
  exists(userId: string, offerId: string): Promise<boolean>;
  findOffersByUserId(userId: string): Promise<DocumentType<OfferEntity>[]>;
}
