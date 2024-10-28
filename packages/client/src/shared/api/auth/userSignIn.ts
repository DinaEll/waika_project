import { post } from '@/shared/api';
import { appConfig } from '@/shared/config';
import { SignInRequest } from '@/shared/interfaces';

export const userSignIn = async (userData: SignInRequest) => {
  return await post(appConfig.baseUrl + '/auth/signin', { data: userData });
};
