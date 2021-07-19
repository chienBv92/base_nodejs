import { inject } from 'inversify';
import express from 'express';
import { TYPES } from '../../types';
import WelcomeService from '../../services/WelcomeService';
import WelcomeResponder from '../responders/WelcomeResponder';
import { controller, httpGet } from 'inversify-express-utils';

@controller('/welcome')
export default class WelcomeController {
  private welcomeService: WelcomeService;
  private welcomeResponder: WelcomeResponder;

  constructor(
    @inject(TYPES.SERVICES.WelcomeService) welcomeService: WelcomeService,
    @inject(TYPES.RESPONDERS.WelcomeResponder)
    welcomeResponder: WelcomeResponder,
  ) {
    this.welcomeService = welcomeService;
    this.welcomeResponder = welcomeResponder;
  }

  @httpGet('/', TYPES.MIDDLEWARES.WelcomeMiddleware)
  public welcome(req: express.Request, res: express.Response) {
    const message = this.welcomeService.getWelcomeMessage();
    this.welcomeResponder.send(message, res);
  }
}
