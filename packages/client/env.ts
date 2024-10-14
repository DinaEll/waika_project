import 'dotenv/config';
import { cleanEnv, port, str } from 'envalid';

export const { CLIENT_PORT, isDev, NODE_ENV } = cleanEnv(process.env, {
  NODE_ENV: str({
    choices: ['development', 'test', 'production', 'staging'] as const,
  }),
  CLIENT_PORT: port({ devDefault: 3000 }),
});
