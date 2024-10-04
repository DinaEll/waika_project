import { isDevelopment } from '../utils';
import { getPageUrl } from './routerConfig';

interface GetYandexUrl {
  clientId: string;
  redirectUrl: string;
}

export const getYandexUrl = ({ clientId, redirectUrl }: GetYandexUrl): string =>
  `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}`;

export const getOauthRedirectUrl = () => {
  return isDevelopment()
    ? `http://localhost:${process.env.CLIENT_PORT}`
    : `${window.location.origin}${getPageUrl('main')}`;
};
