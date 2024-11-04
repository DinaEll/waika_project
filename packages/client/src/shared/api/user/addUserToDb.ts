import { post } from '@/shared/api';
import { UserResponse } from '@/shared/interfaces';

export const addUserToDb = async (userData: UserResponse) => {
  return await post(`http://localhost:3001/forum/user`, { data: userData });
};
