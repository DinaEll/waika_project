import { appConfig } from '@/shared/config'
import axios from 'axios'

type Response<T = unknown> = T
type Request<T = unknown> = {
  [k in string]: T
}

const enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export type ReqOptions = {
  method?: Method
  headers?: Record<string, string>
  data?: Record<string, unknown>
}

type HTTPMethod = <T = unknown>(
  url: string,
  options: Request
) => Promise<Response<T>>

export const post: HTTPMethod = async (url: string, options) => {
  const { fileUpload = false, data } = options
  return await baseRequest(
    url,
    Method.POST,
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
    .then(res => {
      try {
        return JSON.parse(res)
      } catch (err) {
        return res
      }
    })
    .catch(error => {
      console.error(error)
      throw error
    })
}

export const get: HTTPMethod = async (url: string) => {
  return await baseRequest(url, Method.GET)
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

export const put: HTTPMethod = async (url: string, options: Request) => {
  const { fileUpload = false, data } = options
  let formData = null

  if (fileUpload) {
    formData = new FormData()
    try {
      for (const [key, value] of Object.entries(data as Record<string, File>)) {
        formData.append(key, value)
      }
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return await baseRequest(
    url,
    Method.PUT,
    {
      'Content-Type': fileUpload
        ? 'multipart/form-data'
        : 'application/json; charset=UTF-8',
    },
    { data: fileUpload ? formData : JSON.stringify(data) }
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
