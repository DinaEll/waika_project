import { cleanEnv, port, str, host } from 'envalid';

export const {
  API_PORT,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
  isDev,
} = cleanEnv(process.env, {
  POSTGRES_USER: str(),
  POSTGRES_PASSWORD: str(),
  POSTGRES_DB: str(),
  POSTGRES_PORT: port(),
  POSTGRES_HOST: host(),
  API_PORT: port({ devDefault: 3001 }),
});
