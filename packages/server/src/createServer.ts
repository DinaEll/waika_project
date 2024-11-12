import { isObject } from '@waika_project/utils';
import cookieParser from 'cookie-parser';
import cors, { type CorsOptions } from 'cors';
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

interface OptionCors {
  /**@default true */
  useCors?: boolean | CorsOptions;
}

type Options = {
  middlewares?: RequestHandler[];
  routes: RequestHandler;
  useLogger?: boolean;
} & OptionHelmet &
  OptionStatic &
  OptionCors;

export function createServer({
  middlewares,
  routes,
  useCors = true,
  useHelmet,
  useLogger,
  useStatic,
}: Options): Express {
  const server = express();

  server.disable('x-powered-by');

  if (useLogger) {
    server.use(logger);
  }

  if (useHelmet) {
    server.use(isObject(useHelmet) ? helmet(useHelmet) : helmet());
  }

  if (useCors) {
    server.use(isObject(useCors) ? cors(useCors) : cors());
  }

  server.use(cookieParser());

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

  server.use(json());
  server.use(routes);
  server.use(notFound);
  server.use(error);

  return server;
}
