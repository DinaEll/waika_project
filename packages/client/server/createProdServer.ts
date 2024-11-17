import fs from 'fs/promises';
import path from 'path';
import { createServer, Router } from '@waika_project/server';
import { saveToFile } from './helpers';
import type { EntryServerRender } from './types';

type Server = Promise<ReturnType<typeof createServer>>;

export const createProdServer = async (): Server => {
  const distPath = path.join(__dirname, '../dist');
  const clientPath = `${distPath}/client`;
  const entryServerPath = `${distPath}/ssr/entry-server.mjs`;
  const htmlPath = `${clientPath}/index.html`;

  const template = await fs.readFile(htmlPath, 'utf-8');

  const { renderClient } = (await import(entryServerPath)) as {
    renderClient: EntryServerRender;
  };

  const routes = Router();

  routes.get('*', async (req, res, next) => {
    try {
      const { html: appHtml, initialState, css } = await renderClient(req, res);

      const cssPath = path.resolve(__dirname, './client/assets/antd.min.css');

      await saveToFile(cssPath, css);

      const html = template
        .replace(
          '<!--ssr-initial-styles-->',
          `<link rel="stylesheet" href="/assets/antd.min.css"/>`,
        )
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

  const server = createServer({
    routes,
    useStatic: { path: clientPath, options: { index: false } },
  });

  return server;
};
