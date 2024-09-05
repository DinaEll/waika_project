import { GET } from '@/shared/api'
import { UserResponse } from '@/shared/interfaces'

export const getUser = async () => {
  return await GET<UserResponse>('/auth/user', {})
}
