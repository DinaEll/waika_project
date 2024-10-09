import { connectDatabase } from '@waika_project/database';
import { SERVER_PORT } from '../env';
import { createServer } from './createServer';

export function runServer() {
  const server = createServer();

  server.listen(SERVER_PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`  ➜ 🎸 Server is listening on port: ${SERVER_PORT}`);

    void connectDatabase();
  });
}
