import { get } from '@/shared/api';
import type { UserResponse } from '@/shared/interfaces';

export const getUser = async (signal?: AbortSignal) => {
  return await get<UserResponse>('/auth/user', { signal });
};
