import { get } from '@/shared/api';
import { UserResponse } from '@/shared/interfaces';

export const getUser = async () => {
  return await get<UserResponse>('/auth/user', {});
};
