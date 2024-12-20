import { connectDatabase } from '@waika_project/database';
import { createServer } from '@waika_project/server';
import {
  API_PORT,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from '../env';
import { yandexProxyMiddleware } from './middlewares';
import { routes } from './routes';

export async function startApiServer() {
  try {
    await connectDatabase({
      database: POSTGRES_DB,
      host: POSTGRES_HOST,
      password: POSTGRES_PASSWORD,
      port: POSTGRES_PORT,
      username: POSTGRES_USER,
    });

    const server = createServer({
      routes,
      useLogger: true,
      useCors: {
        credentials: true,
        origin: [
          'http://localhost:3000',
          'https://waika-mahjong-41.ya-praktikum.tech',
        ],
      },
      middlewares: [yandexProxyMiddleware],
    });

    server.listen(API_PORT, () => {
      console.log(`  ➜ 🎸 API is listening on: http://localhost:${API_PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
