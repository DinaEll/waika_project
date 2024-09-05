import { appConfig } from '@/shared/config'
import axios from 'axios'

type Response<T = unknown> = T
type Request<T = unknown> = {
  [k in string]: T
}

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type Method = typeof METHODS[keyof typeof METHODS]

export type ReqOptions = {
  method?: Method
  headers?: Record<string, string>
  data?: Record<string, unknown>
}

type HTTPMethod = <T = unknown>(
  url: string,
  options: Request
) => Promise<Response<T>>

export const POST: HTTPMethod = async (url: string, options) => {
  const { fileUpload = false, data } = options
  return await baseRequest(
    url,
    METHODS.POST,
    {
      'Content-Type': fileUpload
        ? 'multipart/form-data'
        : 'application/json; charset=UTF-8',
    },
    {
      data: fileUpload ? data : JSON.stringify(data),
    }
  )
    .then(res => {
      if (res.status !== 200) {
        throw new Error('Error. Please try again')
      }
      return res?.data
    })
    .then(text => {
      try {
        return JSON.parse(text)
      } catch (err) {
        return text
      }
    })
    .catch(error => {
      console.error(error)
      throw error
    })
}

export const GET: HTTPMethod = async (url: string) => {
  return await baseRequest(url, METHODS.GET)
    .then(res => {
      if (res.status !== 200) {
        throw new Error('Error. Please try again')
      }
      return res?.data
    })
    .catch(error => {
      console.error(error)
      throw error
    })
}

export const PUT: HTTPMethod = async (url: string, options: Request) => {
  const { fileUpload = false, data } = options
  return await baseRequest(
    url,
    METHODS.PUT,
    {
      'Content-Type': fileUpload
        ? 'multipart/form-data'
        : 'application/json; charset=UTF-8',
    },
    { data: fileUpload ? data : JSON.stringify(data) }
  )
    .then(res => {
      if (res.status !== 200) {
        throw new Error('Error. Please try again')
      }
      return res?.data
    })
    .catch(error => {
      console.error(error)
      throw error
    })
}

const baseRequest = async (
  url: string,
  method: ReqOptions['method'],
  headers?: ReqOptions['headers'],
  data?: Request
) => {
  return axios(appConfig.baseUrl + url, {
    method,
    headers,
    ...data,
    withCredentials: true,
  })
}
