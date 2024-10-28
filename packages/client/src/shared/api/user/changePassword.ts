import { put } from '@/shared/api';
import { appConfig } from '@/shared/config';
import { ChangePasswordRequest } from '@/shared/interfaces';

export const changePassword = async (formData: ChangePasswordRequest) => {
  return await put(appConfig.baseUrl + '/user/password', { data: formData });
};
