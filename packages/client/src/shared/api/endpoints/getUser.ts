import { GET } from '@/shared/api';

export const getUser = async () => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return await GET('/auth/user');
};
