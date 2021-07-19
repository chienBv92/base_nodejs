import { controller, httpGet } from 'inversify-express-utils';
import { Request, Response } from 'express';

@controller('/')
export default class IndexController {
  @httpGet('/')
  public async index(req: Request, res: Response) {
    res.render('index', {
      pageTitle: 'Welcome',
      pageContent: 'You are using Expressjs',
    });
  }
}
