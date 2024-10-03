import { configureStore } from '@reduxjs/toolkit';
import { Request as ExpressRequest } from 'express';
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
import { rootReducer } from './shared/store/rootReducer';
import { fetchUser } from './shared/store/user/user.action';

export const render = async (req: ExpressRequest) => {
  // согласно доке роутера
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { query, dataRoutes } = createStaticHandler(routes);
  const fetchRequest = createFetchRequest(req);
  const context = await query(fetchRequest);

  if (context instanceof Response) {
    // throw context
    throw new Error(context.statusText);
  }

  const store = configureStore({
    reducer: rootReducer,
  });

  const url = createUrl(req);

  const foundRoutes = matchRoutes(routes, url);

  if (!foundRoutes) {
    throw new Error('Страница не найдена!');
  }

  // из теории
  // const [
  //   {
  //     route: { fetchData },
  //   },
  // ] = foundRoutes;

  await store.dispatch(fetchUser());

  await Promise.all(
    foundRoutes.map(async ({ route }) => {
      if ('fetchData' in route && typeof route.fetchData === 'function') {
        try {
          await route.fetchData({
            dispatch: store.dispatch,
            state: store.getState(),
            // этот контекст передается в initSomePage функцию, но куда он передается дальше? Как и в каком виде прицепить куки к запросу?
            // ctx: createContext(req),
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

  // try {
  //   await fetchData({
  //     dispatch: store.dispatch,
  //     state: store.getState(),
  //   });
  // } catch (e) {
  //   console.log('Инициализация страницы произошла с ошибкой', e);
  // }

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
