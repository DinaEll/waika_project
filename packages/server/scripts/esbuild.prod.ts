import { build } from 'esbuild';
import { esBuildConfig } from './esbuild.config';

async function buildProd() {
  await build(esBuildConfig);
}

buildProd().catch((error) => {
  console.error(error);
  process.exit(1);
});
