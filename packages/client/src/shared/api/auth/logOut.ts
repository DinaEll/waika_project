import { POST } from '@/shared/api'

export const logOut = async () => {
  return await POST('/auth/logout', {})
}
