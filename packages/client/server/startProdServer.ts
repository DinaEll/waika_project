import { CLIENT_PORT } from '../env';
import { createProdServer } from './createProdServer';

async function startProdServer() {
  const server = await createProdServer();

  server.listen(CLIENT_PORT, () => {
    console.log(`  ➜ 🎸 SSR is listening on: http://localhost:${CLIENT_PORT}`);
  });
}

startProdServer().catch((error) => {
  console.error(error);
  process.exit(1);
});
