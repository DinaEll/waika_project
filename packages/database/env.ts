import { cleanEnv, host, port, str } from 'envalid';

export const {
  NODE_ENV,
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASSWORD,
  POSTGRES_PORT,
  POSTGRES_USER,
} = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'test', 'production', 'staging'] as const,
  }),
  POSTGRES_USER: str(),
  POSTGRES_PASSWORD: str(),
  POSTGRES_DB: str(),
  POSTGRES_PORT: port(),
  POSTGRES_HOST: host(),
});
