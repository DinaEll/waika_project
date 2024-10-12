import { context } from 'esbuild';
import { SERVER_PORT } from '../env';
import { esBuildConfig } from './esbuild.config';

async function buildWatch() {
  const ctx = await context(esBuildConfig);

  await ctx.watch();
  console.log(`  ➜ 🎸 Server is listening on: http://localhost:${SERVER_PORT}`);
}

buildWatch().catch((error) => {
  console.error(error);
  process.exit(1);
});
