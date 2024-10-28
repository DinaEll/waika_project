import { post } from '@/shared/api';
import { appConfig } from '@/shared/config';
import { SignUpRequest, SignUpResponse } from '@/shared/interfaces';

export const userSignUp = async (userData: SignUpRequest) => {
  return await post<SignUpResponse>(appConfig.baseUrl + '/auth/signup', {
    data: userData,
  });
};
