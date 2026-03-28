import 'reflect-metadata';
import { RestApplication } from './rest/index.js';
import { Component } from './shared/types/index.js';
import { createUserContainer } from './shared/modules/user/index.js';
import { createOfferContainer } from './shared/modules/offer/index.js';
import { createRestApplicationContainer } from './rest/rest.container.js';

async function bootstrap() {
  const restContainer = createRestApplicationContainer();
  const userContainer = createUserContainer(restContainer);
  const offerContainer = createOfferContainer(userContainer);

  const application = offerContainer.get<RestApplication>(Component.RestApplication);
  await application.init();
}

bootstrap();
