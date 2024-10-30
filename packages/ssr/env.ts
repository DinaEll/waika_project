import { cleanEnv, port } from 'envalid';

export const { CLIENT_PORT, isDev } = cleanEnv(process.env, {
  CLIENT_PORT: port({ devDefault: 3000 }),
});
