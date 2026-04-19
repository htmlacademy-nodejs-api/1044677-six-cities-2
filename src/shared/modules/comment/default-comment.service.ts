import mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { CommentEntity } from './comment.entity.js';
import { OfferEntity } from '../offer/offer.entity.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CreateCommentDto } from './dto/create-comment.dto.js';
import { CommentService } from './comment-service.interface.js';

type CommentStatsAggregate = {
  avgRating: number;
  count: number;
};

@injectable()
export class DefaultCommentService implements CommentService {
  constructor(
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    await this.syncOfferRatingAndCommentCount(dto.offerId);
    return comment.populate('userId');
  }

  public async findByOfferId(offerId: string): Promise<DocumentType<CommentEntity>[]> {
    return this.commentModel
      .find({offerId})
      .populate('userId');
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel
      .deleteMany({offerId})
      .exec();

    await this.syncOfferRatingAndCommentCount(offerId);

    return result.deletedCount ?? 0;
  }

  private async syncOfferRatingAndCommentCount(offerId: string): Promise<void> {
    const offerObjectId = new mongoose.Types.ObjectId(offerId);

    const rows = await this.commentModel
      .aggregate<CommentStatsAggregate>([
        { $match: { offerId: offerObjectId } },
        {
          $group: {
            _id: null,
            avgRating: { $avg: '$rating' },
            count: { $sum: 1 },
          },
        },
      ])
      .exec();

    const commentCount = rows[0]?.count ?? 0;
    const rawAvg = rows[0]?.avgRating;
    const rating =
      rawAvg !== undefined && rawAvg !== null
        ? Math.round(Number(rawAvg) * 10) / 10
        : 0;

    await this.offerModel
      .findByIdAndUpdate(offerId, { commentCount, rating }, { new: true })
      .exec();
  }
}
