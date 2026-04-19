import { Container } from 'inversify';
import { types } from '@typegoose/typegoose';
import { Component } from '../../types/index.js';
import { FavoriteService } from './favorite-service.interface.js';
import { FavoriteEntity, FavoriteModel } from './favorite.entity.js';
import { DefaultFavoriteService } from './default-favorite.service.js';

export function createFavoriteContainer(parent?: Container) {
  const favoriteContainer = new Container(parent ? { parent } : undefined);

  favoriteContainer.bind<FavoriteService>(Component.FavoriteService)
    .to(DefaultFavoriteService)
    .inSingletonScope();

  favoriteContainer.bind<types.ModelType<FavoriteEntity>>(Component.FavoriteModel)
    .toConstantValue(FavoriteModel);

  return favoriteContainer;
}
