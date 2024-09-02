import { POST } from '@/shared/api'

export interface SignInRequest {
  login: string
  password: string
}

export const userSignIn = async (userData: SignInRequest) => {
  return await POST('/auth/signin', userData)
}
