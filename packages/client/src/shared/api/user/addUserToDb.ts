import { post } from '@/shared/api';
import { UserResponse } from '@/shared/interfaces';

export const addUserToDb = async (userData: UserResponse) => {
  return await post(`/forum/user`, { data: userData });
};
