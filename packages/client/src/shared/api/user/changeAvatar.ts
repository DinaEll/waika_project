import { PUT } from '@/shared/api'
import { UserAvatarRequest, UserResponse } from '@/shared/interfaces'

export const changeAvatar = async (formData: UserAvatarRequest) => {
  return await PUT<UserResponse>('/user/profile/avatar', {
    data: formData,
    fileUpload: true,
  })
}
