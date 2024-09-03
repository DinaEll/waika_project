import { GET } from '@/shared/api'

export const getUser = async () => {
  return await GET('/auth/user')
}
