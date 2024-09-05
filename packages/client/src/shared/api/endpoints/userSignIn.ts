import { POST } from '@/shared/api';

export interface SignInRequest {
  login: string;
  password: string;
}

export const userSignIn = async (userData: SignInRequest) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await POST('/auth/signin', userData);
};
