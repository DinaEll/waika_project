import { PageInitContext } from '@/app/router/model/routes';
import { get } from '@/shared/api';
import { UserResponse } from '@/shared/interfaces';

export const getUser = async (ctx: PageInitContext) => {
  console.log('getUser', ctx);

  return await get<UserResponse>('/auth/user', { headers: { Cookie: ctx } });
};
