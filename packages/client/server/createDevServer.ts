import fs from 'fs/promises';
import path from 'path';
import { createServer, Router } from '@waika_project/server';
import { createServer as createViteServer } from 'vite';
import type { EntryServerRender } from './types';

type Server = Promise<ReturnType<typeof createServer>>;

export const createDevServer = async (): Server => {
  const clientPath = path.join(__dirname, '..');
  const htmlPath = `${clientPath}/index.html`;
  let template = await fs.readFile(htmlPath, 'utf-8');
  const entryServerPath = `${clientPath}/src/entry-server.tsx`;

  const vite = await createViteServer({
    server: { middlewareMode: true },
    root: clientPath,
    appType: 'custom',
  });

  const { renderClient } = (await vite.ssrLoadModule(entryServerPath)) as {
    renderClient: EntryServerRender;
  };

  const routes = Router();

  routes.get('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      template = await vite.transformIndexHtml(url, template);

      const {
        html: appHtml,
        initialState,
        styles,
      } = await renderClient(req, res);

      const html = template
        .replace('<!--ssr-styles-->', styles)
        .replace('<!--ssr-outlet-->', appHtml)
        .replace(
          '<!--ssr-initial-state-->',
          `<script>window.APP_INITIAL_STATE = ${JSON.stringify(initialState)}</script>`,
        );

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (error) {
      if (error instanceof Error) {
        vite.ssrFixStacktrace(error);
      }
      next(error);
    }
  });

  const server = createServer({ routes, middlewares: [vite.middlewares] });

  return server;
};
