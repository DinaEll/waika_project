import { type BuildOptions } from 'esbuild';
import { isDev } from '../env';

export const esBuildConfig: BuildOptions = {
  bundle: true,
  entryPoints: ['index.ts'],
  format: 'cjs',
  logLevel: 'info',
  minify: !isDev,
  outfile: 'dist/server.js',
  platform: 'node',
  sourcemap: true,
  target: ['node20'],
  treeShaking: true,
};
