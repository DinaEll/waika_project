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

  server.use(error);
  server.use(cookieParser());

  if (useLogger) {
    server.use(logger);
  }

  if (useHelmet) {
    if (isObject(useHelmet)) {
      helmet(useHelmet);
    } else {
      helmet();
    }
  }

  if (useCors) {
    if (isObject(useCors)) {
      server.use(cors(useCors));
    } else {
      server.use(cors());
    }
  }

  middlewares?.forEach((middleware) => {
    server.use(middleware);
  });

  if (useStatic) {
    if (isObject(useStatic)) {
      const { path, options } = useStatic;
      server.use(expressStatic(path, options));
    } else {
      server.use(expressStatic(useStatic));
    }
  }

  server.use(json());

  server.use(routes);
  server.use(notFound);

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
