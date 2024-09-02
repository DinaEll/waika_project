import { GET } from '@/shared/api'

export async function getUser() {
  const res = await GET('/auth/user')
  return await res.json()
}
