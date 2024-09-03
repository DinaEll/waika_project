import { PUT } from '@/shared/api'

export const changeAvatar = async (formData: FormData) => {
  return await PUT('/user/profile/avatar', formData, true)
}
