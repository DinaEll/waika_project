import { context } from 'esbuild';
import { API_PORT } from '../env';
import { esBuildConfig } from './esbuild.config';

async function buildWatch() {
  const ctx = await context(esBuildConfig);

  await ctx.watch();
  console.log(`  ➜ 🎸 API is listening on: http://localhost:${API_PORT}`);
}

buildWatch().catch((error) => {
  console.error(error);
  process.exit(1);
});
