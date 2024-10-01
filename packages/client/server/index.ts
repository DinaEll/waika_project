import dotenv from 'dotenv';

dotenv.config();

import path from 'path';
import express from 'express';

const port = process.env.PORT || 80;
const clientPath = path.join(__dirname, '..');
const isDev = process.env.NODE_ENV === 'development';

async function createServer() {
  const app = express();

  app.get('*', async (req, res, next) => {
    res.send('Тут будет логика для SSR');
  });

  app.listen(port, () => {
    console.log(`Client is listening on port: ${port}`);
  });
}

createServer();
