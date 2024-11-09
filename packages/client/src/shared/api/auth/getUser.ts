import { get } from '@/shared/api';
import type { UserResponse } from '@/shared/interfaces';
import type { PageInitContext } from '@/shared/types';
import { isDefined } from '../../utils';

interface Options {
  ctx?: PageInitContext;
  signal?: AbortSignal;
}

export const getUser = async (options?: Options) => {
  return await get<UserResponse>(__API_PRACTICUM_URL__ + '/auth/user', {
    ...(isDefined(options?.ctx) ? { headers: { Cookie: options?.ctx } } : {}),
    signal: options?.signal,
  });
};
