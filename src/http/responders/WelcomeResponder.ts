import express from 'express';
import { injectable } from 'inversify';

@injectable()
export default class WelcomeResponder {
  public send(message: string, res: express.Response) {
    res.status(200).json({
      message: message,
    });
  }
}
