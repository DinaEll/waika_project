import { POST } from '@/shared/api'

export interface SignUpRequest {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export const userSignUp = async (userData: SignUpRequest) => {
  return await POST('/auth/signup', userData)
}
