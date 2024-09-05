import { POST } from '@/shared/api'
import { SignInRequest } from '@/shared/interfaces'

export const userSignIn = async (userData: SignInRequest) => {
  return await POST('/auth/signin', { data: userData })
}
