import { build } from 'esbuild';

async function buildProd() {
  await build({
    entryPoints: ['index.ts'],
    bundle: true,
    minify: true,
    sourcemap: false,
    platform: 'node',
    target: ['node20'],
    outfile: 'dist/server.js',
  });
}

void buildProd();
