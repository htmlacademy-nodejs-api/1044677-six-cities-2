import { inject, injectable } from 'inversify';
import { OfferEntity } from './offer.entity.js';
import { Logger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { OfferService } from './offer-service.interface.js';
import { City, Component, HousingType } from '../../types/index.js';

@injectable()
export class DefaultOfferService implements OfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findById(offerId)
      .populate(['userId'])
      .exec();
  }

  public async findByCity(city: City): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find({ city }).exec();
  }

  public async findByType(type: HousingType): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find({ type }).exec();
  }

  public async findByPrice(price: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find({ price }).exec();
  }

  public async findByRating(rating: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find({ rating }).exec();
  }

  public async findByTitle(title: string): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel.find({ title }).exec();
  }

  public async findByTitleOrCreate(offerTitle: string, dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const existing = await this.offerModel.findOne({ title: offerTitle }).exec();
    if (existing) {
      return existing;
    }
    return this.create(dto);
  }
}
