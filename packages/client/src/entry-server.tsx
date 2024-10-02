import { configureStore } from '@reduxjs/toolkit';
import { Request as ExpressRequest } from 'express';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';
// import { routes } from './app/router/model/router';
import { routes } from './app/router/model/routes';
import { createFetchRequest } from './entry-server.utils';
import { rootReducer } from './shared/store/rootReducer';

export const render = async (req: ExpressRequest) => {
  // 1.
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { query, dataRoutes } = createStaticHandler(routes);
  // 2.
  const fetchRequest = createFetchRequest(req);
  // 3.
  const context = await query(fetchRequest);

  // 4.
  if (context instanceof Response) {
    // eslint-disable-next-line @typescript-eslint/only-throw-error
    throw context;
  }

  // 5.
  const store = configureStore({
    reducer: rootReducer,
  });

  // 6.
  const router = createStaticRouter(dataRoutes, context);

  // 7.
  return {
    html: renderToString(
      <Provider store={store}>
        <StaticRouterProvider router={router} context={context} />
      </Provider>,
    ),
    initialState: store.getState(),
  };
};
