import { post } from '@/shared/api';
import { appConfig } from '@/shared/config';

export const logOut = async () => {
  return await post(appConfig.baseUrl + '/auth/logout', {});
};
