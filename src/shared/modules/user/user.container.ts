import { Container } from 'inversify';
import { Component } from '../../types/index.js';
import { UserService } from './user-service.interface.js';
import { DefaultUserService } from './default-user.service.js';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<UserService>(Component.UserService).to(DefaultUserService).inSingletonScope();

  return userContainer;
}
