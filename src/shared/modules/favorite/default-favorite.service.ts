import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { FavoriteEntity } from './favorite.entity.js';
import { OfferEntity } from '../offer/offer.entity.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CreateFavoriteDto } from './dto/create-favorite.dto.js';
import { FavoriteService } from './favorite-service.interface.js';

@injectable()
export class DefaultFavoriteService implements FavoriteService {
  constructor(
    @inject(Component.FavoriteModel) private readonly favoriteModel: types.ModelType<FavoriteEntity>
  ) {}

  public async create(dto: CreateFavoriteDto): Promise<DocumentType<FavoriteEntity>> {
    return this.favoriteModel.create(dto);
  }

  public async deleteByUserAndOffer(userId: string, offerId: string): Promise<boolean> {
    const result = await this.favoriteModel.deleteOne({ userId, offerId }).exec();
    return result.deletedCount > 0;
  }

  public async exists(userId: string, offerId: string): Promise<boolean> {
    return (await this.favoriteModel.exists({ userId, offerId }).exec()) !== null;
  }

  public async findOffersByUserId(userId: string): Promise<DocumentType<OfferEntity>[]> {
    const favorites = await this.favoriteModel
      .find({ userId })
      .populate<DocumentType<OfferEntity>>('offerId')
      .exec();

    return favorites
      .map((f) => f.offerId)
      .filter((offer): offer is DocumentType<OfferEntity> => offer !== null && typeof offer === 'object');
  }
}
