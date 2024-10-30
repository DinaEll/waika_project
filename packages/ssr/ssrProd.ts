import { CLIENT_PORT } from './env';
import { createProdServer } from './src/createProdServer';

async function runServer() {
  const server = await createProdServer();

  server.listen(CLIENT_PORT, () => {
    console.log(`  ➜ 🎸 SSR is listening on: http://localhost:${CLIENT_PORT}`);
  });
}

runServer().catch((error) => {
  console.error(error);
  process.exit(1);
});
