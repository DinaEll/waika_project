import { post } from '@/shared/api'
import { SignInRequest } from '@/shared/interfaces'

export const userSignIn = async (userData: SignInRequest) => {
  return await post('/auth/signin', { data: userData })
}
