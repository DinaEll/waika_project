import { post } from '@/shared/api';

export const logOut = async () => {
  return await post(__API_PRACTICUM_URL__ + '/auth/logout', {});
};
