import { CLIENT_PORT } from '../env';
import { createDevServer } from './createDevServer';

async function startDevServer() {
  const server = await createDevServer();

  server.listen(CLIENT_PORT, () => {
    console.log(`  ➜ 🎸 SSR is listening on: http://localhost:${CLIENT_PORT}`);
  });
}

startDevServer().catch((error) => {
  console.error(error);
  process.exit(1);
});
