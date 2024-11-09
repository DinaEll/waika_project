import { post } from '@/shared/api';
import { SignInRequest } from '@/shared/interfaces';

export const userSignIn = async (userData: SignInRequest) => {
  return await post(__API_PRACTICUM_URL__ + '/auth/signin', { data: userData });
};
