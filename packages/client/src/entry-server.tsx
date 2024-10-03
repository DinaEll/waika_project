// import { configureStore } from '@reduxjs/toolkit';
import {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from 'express';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { matchRoutes } from 'react-router-dom';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';
import { routes } from './app/router/model/routes';
import { createFetchRequest, createUrl } from './entry-server.utils';
import { store } from './shared/store/store';

export const render = async (req: ExpressRequest, res: ExpressResponse) => {
  // согласно доке роутера
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { query, dataRoutes } = createStaticHandler(routes);
  const fetchRequest = createFetchRequest(req);
  const context = await query(fetchRequest);

  if (
    context instanceof Response &&
    [301, 302, 303, 307, 308].includes(context.status)
  ) {
    const location = context.headers.get('Location');
    if (location !== null) {
      return res.redirect(context.status, location);
    } else {
      throw new Error('Missing Location header in redirect response');
    }
  } else if (context instanceof Response) {
    // throw context
    throw new Error(context.statusText);
  }

  const url = createUrl(req);

  const foundRoutes = matchRoutes(routes, url);

  if (!foundRoutes) {
    throw new Error('Страница не найдена!');
  }

  // get('/auth/user', {
  //   headers: {
  //     'Cookie': 'authCookie=da611059196b669a25d90e2863fa5e0d99994227%3A1727953423; uuid=8d17c406-d0dc-4ef3-8a0b-c2c7778cf5e1',
  //     'Access-Control-Allow-Credentials': true,
  //   },
  // })
  //   .then((res) => {
  //     console.log('Успешный успех', req.headers.cookie, res);
  //   })
  //   .catch((e) => {
  //     console.log('Не успех(', req.headers.cookie, e);
  //   });

  await Promise.all(
    foundRoutes.map(async ({ route }) => {
      if ('fetchData' in route && typeof route.fetchData === 'function') {
        try {
          await route.fetchData({
            dispatch: store.dispatch,
            state: store.getState(),
            // TODO добавить выделение нужных кук
            // ctx: createContext(req),
            // ctx: req.headers.cookie,
            ctx: 'authCookie=da611059196b669a25d90e2863fa5e0d99994227%3A1727953423; uuid=8d17c406-d0dc-4ef3-8a0b-c2c7778cf5e1',
          });
          console.log(
            'Инициализация страницы прошла успешно',
            store.getState(),
          );
        } catch (e) {
          console.log('Инициализация страницы произошла с ошибкой', e);
        }
      }
    }),
  );

  const router = createStaticRouter(dataRoutes, context);

  return {
    html: renderToString(
      <Provider store={store}>
        <StaticRouterProvider router={router} context={context} />
      </Provider>,
    ),
    initialState: store.getState(),
  };
};
