import { put } from '@/shared/api';
import { appConfig } from '@/shared/config';
import { UserResponse } from '@/shared/interfaces';

export const changeAvatar = async (name: string, value: File) => {
  return await put<UserResponse>(appConfig.baseUrl + '/user/profile/avatar', {
    data: {
      [name]: value,
    },
    fileUpload: true,
  });
};
