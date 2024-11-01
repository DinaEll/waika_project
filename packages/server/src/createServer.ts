import { isObject } from '@waika_project/utils';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, {
  json,
  type Express,
  type RequestHandler,
  static as expressStatic,
} from 'express';
import helmet, { type HelmetOptions } from 'helmet';
import { error, logger, notFound } from './middlewares';

type OptionHelmet =
  | { useHelmet?: never }
  | { useHelmet: boolean | HelmetOptions };

type OptionStatic =
  | { useStatic?: never }
  | {
      useStatic:
        | string
        | { path: string; options?: Parameters<typeof expressStatic>[1] };
    };

type Options = {
  middlewares?: RequestHandler[];
  routes: RequestHandler;
  useLogger?: boolean;
} & OptionHelmet &
  OptionStatic;

export function createServer({
  middlewares,
  routes,
  useHelmet,
  useLogger = true,
  useStatic,
}: Options): Express {
  const server = express();

  server.disable('x-powered-by');

  if (useLogger) {
    server.use(logger);
  }

  if (useHelmet) {
    server.use(helmet(isObject(useHelmet) ? useHelmet : undefined));
  }

  server.use(cors());
  server.use(cookieParser());
  server.use(json());
  server.use(error);

  if (useStatic) {
    if (isObject(useStatic)) {
      const { path, options } = useStatic;
      server.use(expressStatic(path, options));
    } else {
      server.use(expressStatic(useStatic));
    }
  }

  middlewares?.forEach((middleware) => {
    server.use(middleware);
  });

  server.use(routes);

  server.use(notFound);

  return server;
}
