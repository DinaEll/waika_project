import { runServer } from './src';

runServer().catch((error) => {
  console.error(error);
  process.exit(1);
});
