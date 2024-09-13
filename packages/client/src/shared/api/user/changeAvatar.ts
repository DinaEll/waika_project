import { put } from '@/shared/api';
import { UserResponse } from '@/shared/interfaces';

export const changeAvatar = async (name: string, value: File) => {
  return await put<UserResponse>('/user/profile/avatar', {
    data: {
      [name]: value,
    },
    fileUpload: true,
  });
};
