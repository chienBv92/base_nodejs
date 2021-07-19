import config from './config';
import { createConnection } from 'typeorm';
import { Container } from 'inversify';
import { TYPES } from './types';
import winston, { Logger } from 'winston';
import WelcomeService from './services/WelcomeService';
import WelcomeResponder from './http/responders/WelcomeResponder';
import WelcomeMiddleware from './http/middlewares/WelcomeMiddleware';

const container = new Container();

// common modules
container
  .bind<Logger>(TYPES.Logger)
  .toConstantValue(winston.createLogger(config.log.winston));

// INFRASTRUCTURE modules
createConnection(config.database).then((connection) => {
  container.bind(TYPES.INFRASTRUCTURE.DBConnection).toConstantValue(connection);
});

// Services
container
  .bind<WelcomeService>(TYPES.SERVICES.WelcomeService)
  .to(WelcomeService);

// Middleware
container
  .bind<WelcomeMiddleware>(TYPES.MIDDLEWARES.WelcomeMiddleware)
  .to(WelcomeMiddleware);

// Responders
container
  .bind<WelcomeResponder>(TYPES.RESPONDERS.WelcomeResponder)
  .to(WelcomeResponder);

export { container };
