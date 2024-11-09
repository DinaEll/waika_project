import { build as buildProdServer } from 'esbuild';

buildProdServer({
  bundle: true,
  entryPoints: ['server/startProdServer.ts'],
  format: 'cjs',
  logLevel: 'info',
  minify: true,
  outfile: 'dist/server.js',
  platform: 'node',
  sourcemap: true,
  target: ['node20'],
  treeShaking: true,
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
