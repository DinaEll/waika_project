import { Router } from '@waika_project/server';
import type { EntryServerRender } from './types';

export const getRoutes = (
  template: string,
  renderClient: EntryServerRender,
) => {
  const router = Router();

  router.get('*', async (req, res, next) => {
    try {
      const { html: appHtml, initialState } = await renderClient(req, res);

      const html = template
        .replace('<!--ssr-outlet-->', appHtml)
        .replace(
          '<!--ssr-initial-state-->',
          `<script>window.APP_INITIAL_STATE = ${JSON.stringify(initialState)}</script>`,
        );

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      next(e);
    }
  });

  return router;
};
