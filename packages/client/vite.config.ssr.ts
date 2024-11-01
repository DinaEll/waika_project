import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { CLIENT_PORT, isDev } from './env';

const srcPath = path.join(__dirname, 'src');

export default defineConfig({
  server: {
    port: CLIENT_PORT,
  },
  define: {
    __CLIENT_PORT__: CLIENT_PORT,
    __isDev__: isDev,
  },
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(srcPath),
      },
    ],
  },
  build: {
    outDir: 'dist/server',
    ssr: 'src/entry-server.tsx',
    rollupOptions: {
      output: { format: 'esm', entryFileNames: '[name].mjs' },
    },
  },
  ssr: {
    noExternal: true,
  },
});
