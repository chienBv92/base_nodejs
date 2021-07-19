import 'reflect-metadata';
import { HttpError } from 'http-errors';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import cors from 'cors';
import { Logger } from 'winston';
import morgan from 'morgan';
import { TYPES } from './types';
import { container } from './container';
import AppError from './errors/AppError';
import config from './config';
import cookieParser from 'cookie-parser';
import { InversifyExpressServer } from 'inversify-express-utils';

import './http/controllers/WelcomeController';
import './http/controllers/IndexController';

const server = new InversifyExpressServer(container);

server.setConfig((app: express.Application) => {
  app.use(morgan(config.log.morgan.format, config.log.morgan.options));
  app.use(cors());
  app.options('*', cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  if (config.app.cookies) {
    app.use(cookieParser());
  }
  app.set('views', path.join(__dirname, '../resources/views'));
  app.set('view engine', 'ejs');
  app.use(express.static(path.join(__dirname, '../resources/public')));
});

server.setErrorConfig((app: express.Application) => {
  app.use(
    (err: Error, req: Request, res: Response, next: NextFunction): void => {
      const logger = container.get<Logger>(TYPES.Logger);

      if (err instanceof AppError) {
        logger.error(err.message, err.stack);
        res.status(err.status).json({
          message: err.message,
          detail: err.detail,
        });
        return;
      }

      if (err instanceof HttpError) {
        res.status(err.status).json({
          code: err.code,
          message: err.message,
        });
        return;
      }

      console.error(err);
      logger.error(err.message, err.stack);
      res.status(500).json({ message: 'Internal Server Error' });
    },
  );
});

const app = server.build();
export default app;
