import { post } from '@/shared/api';
import { UserResponse } from '@/shared/interfaces';

export const addUserToDb = async (userData: UserResponse) => {
  return await post(`${__API_BASE_URL__}/forum/user`, { data: userData });
};
