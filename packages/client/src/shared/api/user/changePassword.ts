import { PUT } from '@/shared/api'
import { ChangePasswordRequest } from '@/shared/interfaces'

export const changePassword = async (formData: ChangePasswordRequest) => {
  return await PUT('/user/password', { data: formData })
}
