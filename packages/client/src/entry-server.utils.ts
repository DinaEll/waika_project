/* eslint-disable @typescript-eslint/no-explicit-any */
// packages/client/src/entry-server.utils.ts

import { Request as ExpressRequest } from 'express';
// import { PageInitContext } from './app/router/model/routes';

// export const createContext = (req: ExpressRequest): PageInitContext => {
//   console.log('cookies', req.cookies);

//   return {
//     clientToken: req.cookies,
//   };
// };

export const createUrl = (req: ExpressRequest) => {
  const origin = `${req.protocol}://${req.get('host')}`;

  return new URL(req.originalUrl || req.url, origin);
};

export const createFetchRequest = (req: ExpressRequest) => {
  const url = createUrl(req);

  const controller = new AbortController();
  req.on('close', () => controller.abort());

  const headers = new Headers();

  for (const [key, values] of Object.entries(req.headers)) {
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  const init: {
    method: string;
    headers: Headers;
    signal: AbortSignal;
    body?: BodyInit;
  } = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    init.body = req.body;
  }

  return new Request(url.href, init);
};
