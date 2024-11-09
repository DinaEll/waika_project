import { get } from '@/shared/api';
import { UserResponse } from '@/shared/interfaces';

export const getUserFromDb = async (userId: string) => {
  return await get<UserResponse>(
    `http://localhost:3001/forum/user?user_id=${userId}`,
  );
};