import { POST } from '@/shared/api'
import { SignUpRequest, SignUpResponse } from '@/shared/interfaces'

export const userSignUp = async (userData: SignUpRequest) => {
  return await POST<SignUpResponse>('/auth/signup', { data: userData })
}
