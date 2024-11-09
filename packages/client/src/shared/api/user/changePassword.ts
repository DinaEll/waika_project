import { put } from '@/shared/api';
import { ChangePasswordRequest } from '@/shared/interfaces';

export const changePassword = async (formData: ChangePasswordRequest) => {
  return await put(__API_PRACTICUM_URL__ + '/user/password', {
    data: formData,
  });
};
