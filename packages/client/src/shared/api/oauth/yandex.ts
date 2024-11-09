import { get, post } from '@/shared/api';
import type {
  SignInOauthYandexRequest,
  GetServiceIdOauthYandexRequest,
  GetServiceIdOauthYandexResponse,
} from '@/shared/interfaces';

export const signInOauthYandex = async (
  data: SignInOauthYandexRequest,
  signal: AbortSignal,
) => {
  return await post<void | undefined>(__API_PRACTICUM_URL__ + '/oauth/yandex', {
    data,
    signal,
  });
};

export const getServiceIdOauthYandex = async (
  data: GetServiceIdOauthYandexRequest,
) => {
  return await get<GetServiceIdOauthYandexResponse>(
    '/oauth/yandex/service-id',
    {
      data,
    },
  );
};
