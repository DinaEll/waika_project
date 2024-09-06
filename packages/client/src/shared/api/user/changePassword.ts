import { put } from '@/shared/api'
import { ChangePasswordRequest } from '@/shared/interfaces'

export const changePassword = async (formData: ChangePasswordRequest) => {
  return await put('/user/password', { data: formData })
}
