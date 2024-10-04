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
  return await post<void | undefined>('/oauth/yandex', { data, signal });
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
