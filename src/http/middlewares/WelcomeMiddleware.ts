import express from 'express';
import { BaseMiddleware } from 'inversify-express-utils';

export default class WelcomeMiddleware extends BaseMiddleware {
  handler(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ): void {
    return next();
  }
}
