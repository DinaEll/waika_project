import { post } from '@/shared/api';
import { SignUpRequest, SignUpResponse } from '@/shared/interfaces';

export const userSignUp = async (userData: SignUpRequest) => {
  return await post<SignUpResponse>(__API_PRACTICUM_URL__ + '/auth/signup', {
    data: userData,
  });
};
