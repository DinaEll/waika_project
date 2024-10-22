import { connectDatabase } from '@waika_project/database';
import { SERVER_PORT } from '../env';
import { createServer } from './createServer';

export async function runServer() {
  try {
    await connectDatabase();

    const server = createServer();
    server.listen(SERVER_PORT, () => {
      console.log(
        `  ➜ 🎸 Server is listening on: http://localhost:${SERVER_PORT}`,
      );
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
