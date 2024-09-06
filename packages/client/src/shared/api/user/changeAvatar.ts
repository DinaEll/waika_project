import { put } from '@/shared/api'
import { UserAvatarRequest, UserResponse } from '@/shared/interfaces'

export const changeAvatar = async (formData: UserAvatarRequest) => {
  return await put<UserResponse>('/user/profile/avatar', {
    data: formData,
    fileUpload: true,
  })
}
