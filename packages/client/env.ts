import 'dotenv/config';
import { cleanEnv, port, str, url } from 'envalid';

export const { APP_NAME, API_BASE_URL, API_PRACTICUM_URL, CLIENT_PORT, isDev } =
  cleanEnv(process.env, {
    APP_NAME: str(),
    API_BASE_URL: url(),
    API_PRACTICUM_URL: url(),
    CLIENT_PORT: port({ devDefault: 3000 }),
  });
