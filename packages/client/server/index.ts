/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import fs from 'fs/promises';
import path from 'path';
import cookieParser from 'cookie-parser';
import { config as dotenvConfig } from 'dotenv';
import express, {
  static as expressStatic,
  Request as ExpressRequest,
} from 'express';
import { createServer as createViteServer, ViteDevServer } from 'vite';

dotenvConfig();

const port = process.env.PORT ?? 80;
const clientPath = path.join(__dirname, '..');
const isDev = process.env.NODE_ENV === 'development';

async function createServer() {
  const app = express();

  //eslint-disable-next-line
  app.use(cookieParser());

  let vite: ViteDevServer | undefined;

  if (isDev) {
    vite = await createViteServer({
      server: { middlewareMode: true },
      root: clientPath,
      appType: 'custom',
    });

    app.use(vite.middlewares);
  } else {
    app.use(
      expressStatic(path.join(clientPath, 'dist/client'), { index: false }),
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  app.get('*', async (req, res, next) => {
    const url = req.originalUrl;

    try {
      let render: (
        req: ExpressRequest,
      ) => Promise<{ html: string; initialState: unknown }>;

      let template: string;

      if (vite) {
        // Получаем файл client/index.html который мы правили ранее

        template = await fs.readFile(
          path.resolve(clientPath, 'index.html'),
          'utf-8',
        );

        // Применяем встроенные HTML-преобразования Vite и плагинов
        template = await vite.transformIndexHtml(url, template);

        // Загружаем модуль клиента, который писали выше,
        // он будет рендерить HTML-код
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        render = (
          await vite.ssrLoadModule(
            path.join(clientPath, 'src/entry-server.tsx'),
          )
        ).render;
      } else {
        template = await fs.readFile(
          path.join(clientPath, 'dist/client/index.html'),
          'utf-8',
        );

        // Получаем путь до модуля клиента, чтобы не тащить средства сборки клиента на сервер
        const pathToServer = path.join(
          clientPath,
          'dist/server/entry-server.js',
        );

        // Импортируем этот модуль и вызываем с начальным состоянием
        // TODO ошибки   @typescript-eslint/no-unsafe-assignment @typescript-eslint/no-unsafe-member-access
        render = (await import(pathToServer)).render;
      }

      // Получаем HTML-строку из JSX
      const { html: appHtml, initialState } = await render(req);

      // Заменяем комментарий на сгенерированную HTML-строку
      const html = template
        .replace(`<!--ssr-outlet-->`, appHtml)
        .replace(
          `<!--ssr-initial-state-->`,
          `<script>window.APP_INITIAL_STATE = ${JSON.stringify(initialState)}</script>`,
        );

      // Завершаем запрос и отдаём HTML-страницу
      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (e) {
      if (vite) {
        vite.ssrFixStacktrace(e as Error);
      }
      next(e);
    }
  });

  app.listen(port, () => {
    console.log(`Client is listening on port: ${port}`);
  });
}

createServer().catch(console.error);
