import { context } from 'esbuild';
import { esBuildConfig } from './esbuild.config';

async function buildWatch() {
  const ctx = await context(esBuildConfig);

  await ctx.watch();
}

buildWatch().catch((error) => {
  console.error(error);
  process.exit(1);
});
