import { getPageUrl } from './routerConfig';

interface GetYandexUrl {
  clientId: string;
  redirectUrl: string;
}

export const getYandexUrl = ({ clientId, redirectUrl }: GetYandexUrl): string =>
  `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUrl}`;

export const getOauthRedirectUrl = () => {
  return __isDev__
    ? `http://localhost:${__CLIENT_PORT__}`
    : `${window.location.origin}${getPageUrl('main')}`;
};
