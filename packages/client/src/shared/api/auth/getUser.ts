import { get } from '@/shared/api';
import { appConfig } from '@/shared/config';
import type { UserResponse } from '@/shared/interfaces';
import type { PageInitContext } from '@/shared/types';
import { isDefined } from '../../utils';

interface Options {
  ctx?: PageInitContext;
  signal?: AbortSignal;
}

export const getUser = async (options?: Options) => {
  return await get<UserResponse>(appConfig.baseUrl + '/auth/user', {
    ...(isDefined(options?.ctx) ? { headers: { Cookie: options?.ctx } } : {}),
    signal: options?.signal,
  });
};
