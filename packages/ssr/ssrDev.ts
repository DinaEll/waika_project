import { CLIENT_PORT } from './env';
import { createDevServer } from './src/createDevServer';

async function runServer() {
  const server = await createDevServer();

  server.listen(CLIENT_PORT, () => {
    console.log(`  ➜ 🎸 SSR is listening on: http://localhost:${CLIENT_PORT}`);
  });
}

runServer().catch((error) => {
  console.error(error);
  process.exit(1);
});
