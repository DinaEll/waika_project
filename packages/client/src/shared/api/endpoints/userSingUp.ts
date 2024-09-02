import { POST } from '@/shared/api'

export interface SignUpRequest {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export async function userSignUp(userData: SignUpRequest) {
  const res = await POST('/auth/signup', userData)
  return await res.json()
}
