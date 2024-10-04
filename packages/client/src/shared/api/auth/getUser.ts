import { get } from '@/shared/api';
import { UserResponse } from '@/shared/interfaces';
import { PageInitContext } from '@/shared/types/initPageTypes';

export const getUser = async (ctx: PageInitContext) => {
  console.log('getUser', ctx);

  return await get<UserResponse>('/auth/user', { headers: { Cookie: ctx } });
};
