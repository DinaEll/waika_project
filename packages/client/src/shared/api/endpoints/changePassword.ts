import { PUT } from '@/shared/api'

export interface ChangePassword {
  oldPassword: string
  newPassword: string
}

export const changePassword = async (formData: ChangePassword) => {
  return await PUT('/user/password', formData)
}
