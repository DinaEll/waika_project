import { get, post } from '@/shared/api';
import { appConfig } from '@/shared/config';
import type {
  SignInOauthYandexRequest,
  GetServiceIdOauthYandexRequest,
  GetServiceIdOauthYandexResponse,
} from '@/shared/interfaces';

export const signInOauthYandex = async (
  data: SignInOauthYandexRequest,
  signal: AbortSignal,
) => {
  return await post<void | undefined>(appConfig.baseUrl + '/oauth/yandex', {
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
