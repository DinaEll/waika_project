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
    outDir: path.join(__dirname, 'dist/client'),
  },
});
