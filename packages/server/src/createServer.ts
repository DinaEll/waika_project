import cors from 'cors';
import express, { json, type Express } from 'express';
import { error, logger, notFound } from './middlewares';
import { routes } from './routes';

export function createServer(): Express {
  const server = express();

  server.disable('x-powered-by');

  server.use(logger);
  server.use(cors());
  server.use(json());
  server.use(routes);
  server.use(notFound);
  server.use(error);

  return server;
}
