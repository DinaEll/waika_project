import { type BuildOptions } from 'esbuild';

export const esBuildConfig: BuildOptions = {
  bundle: true,
  entryPoints: ['index.ts'],
  format: 'cjs',
  logLevel: 'info',
  minify: true,
  outfile: 'dist/server.js',
  platform: 'node',
  sourcemap: false,
  target: ['node20'],
  treeShaking: true,
};
