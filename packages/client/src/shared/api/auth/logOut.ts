import { post } from '@/shared/api';

export const logOut = async () => {
  return await post('/auth/logout', {});
};
