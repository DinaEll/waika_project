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
import { setPageHasBeenInitializedOnServer } from './shared/store/ssr/ssr.slice';
import { store } from './shared/store/store';

export const render = async (req: ExpressRequest, res: ExpressResponse) => {
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
    throw new Error(context.statusText);
  }

  const url = createUrl(req);

  const foundRoutes = matchRoutes(routes, url);

  if (!foundRoutes) {
    throw new Error('Страница не найдена!');
  }

  store.dispatch(setPageHasBeenInitializedOnServer(true));

  await Promise.all(
    foundRoutes.map(async ({ route }) => {
      if ('fetchData' in route && typeof route.fetchData === 'function') {
        try {
          const state = store.getState();
          await route.fetchData({
            dispatch: store.dispatch,
            state: state,
            ctx: req.headers.cookie ?? '',
          });
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
