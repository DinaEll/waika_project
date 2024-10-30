import { connectDatabase } from '@waika_project/database';
import { createServer, routes } from '@waika_project/server';
import {
  API_PORT,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} from '../env';

export async function runServer() {
  try {
    await connectDatabase({
      database: POSTGRES_DB,
      host: POSTGRES_HOST,
      password: POSTGRES_PASSWORD,
      port: POSTGRES_PORT,
      username: POSTGRES_USER,
    });

    const server = createServer({ routes, useLogger: true });

    server.listen(API_PORT, () => {
      console.log(`  ➜ 🎸 API is listening on: http://localhost:${API_PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
