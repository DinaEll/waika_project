import fs from 'fs/promises';
import path from 'path';
import { createServer } from '@waika_project/server';
import { getRoutes } from './getRoutes';
import type { EntryServerRender } from './types';

type Server = Promise<ReturnType<typeof createServer>>;

export const createProdServer = async (): Server => {
  const clientPath = path.join(__dirname, '../../client/dist');
  const htmlPath = `${clientPath}/index.html`;
  const template = await fs.readFile(htmlPath, 'utf-8');
  const entryServerPath = `${clientPath}/entry-server.js`;

  const { renderClient } = (await import(entryServerPath)) as {
    renderClient: EntryServerRender;
  };

  const routes = getRoutes(template, renderClient);

  const server = createServer({
    routes,
    useStatic: { path: clientPath, options: { index: false } },
  });

  return server;
};
