import { put } from '@/shared/api';
import { UserResponse } from '@/shared/interfaces';

export const changeAvatar = async (name: string, value: File) => {
  return await put<UserResponse>(
    __API_PRACTICUM_URL__ + '/user/profile/avatar',
    {
      data: {
        [name]: value,
      },
      fileUpload: true,
    },
  );
};
