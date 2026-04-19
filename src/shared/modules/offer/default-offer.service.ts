import { inject, injectable } from 'inversify';
import { OfferEntity } from './offer.entity.js';
import { CommentModel } from '../comment/index.js';
import { Logger } from '../../libs/logger/index.js';
import { DEFAULT_OFFERS_LIMIT } from './offer.constant.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CreateOfferDto } from './dto/create-offer.dto.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { OfferService } from './offer-service.interface.js';
import { City, Component, HousingType, SortType } from '../../types/index.js';

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

  public async findPremiumByCity(city: City): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find({ city, isPremium: true })
      .populate(['userId'])
      .exec();
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

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const offersLimit = count ?? DEFAULT_OFFERS_LIMIT;
    return this.offerModel
      .find({}, {limit: offersLimit})
      .populate(['userId'])
      .exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    await CommentModel.deleteMany({ offerId }).exec();

    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: documentId})) !== null;
  }

  public async findNew(count: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({ createdAt: SortType.Down })
      .limit(count)
      .populate(['userId'])
      .exec();
  }

  public async findDiscussed(count: number): Promise<DocumentType<OfferEntity>[]> {
    return this.offerModel
      .find()
      .sort({ commentCount: SortType.Down })
      .limit(count)
      .populate(['userId'])
      .exec();
  }
}
