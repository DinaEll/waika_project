import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { CLIENT_PORT, isDev, API_BASE_URL, APP_NAME } from './env';

const srcPath = path.join(__dirname, 'src');

export default defineConfig({
  server: {
    port: CLIENT_PORT,
  },
  define: {
    __API_BASE_URL__: JSON.stringify(API_BASE_URL),
    __APP_NAME__: JSON.stringify(APP_NAME),
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
    outDir: 'dist/client',
  },
});
