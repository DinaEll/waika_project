import { appConfig } from '@/shared/config'

export const POST = async (
  url: string,
  data: unknown,
  credentials: RequestCredentials = 'include'
) => {
  return await fetch(appConfig.baseUrl + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    credentials,
    body: JSON.stringify(data),
  })
}

export const GET = async (
  url: string,
  credentials: RequestCredentials = 'include'
) => {
  return await fetch(appConfig.baseUrl + url, {
    method: 'GET',
    credentials,
  })
}
