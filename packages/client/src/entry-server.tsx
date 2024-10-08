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
import { getPageUrl } from './shared/config';
import { setPageHasBeenInitializedOnServer } from './shared/store/ssr/ssr.slice';
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
            // ctx: req.headers.cookie,
            // ctx: 'authCookie=0eaacd236adebe2fe67147678832bf8e66d6f235%3A1728033984; uuid=b6411a88-430f-48e5-92b8-5c24d587b9d2;',
            ctx: '',
          });

          // Коллегам:
          // Чтобы посмотреть внутренние страницы без постоянного логина, нужно залогиниться, достать куки захардкодить их в ctx
          // Для каждого логина и логаута куки будут разные, так что если нужно посмотреть страницы логина, лучше не делать разлогин, а в ctx передавать пустую строку
          // Если форма логина возвращает 400 ошибку, нужно сделать логаут (добавил кнопку в форму)

          // route protection
          const hasUser = state?.user.data;
          const nonProtectedRoutes = [
            getPageUrl('login'),
            getPageUrl('registration'),
          ] as string[];
          const nonProtectedRoute = nonProtectedRoutes.includes(
            route.path ?? '',
          );

          if (
            !hasUser &&
            !nonProtectedRoute &&
            route.path !== getPageUrl('not-found') &&
            route.path !== getPageUrl('server-error')
          ) {
            res.redirect('/login');
          }

          if (hasUser && nonProtectedRoute) {
            res.redirect('/game');
          }
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
