import { appConfig } from '@/shared/config'
import axios from 'axios'

export const POST = async (
  url: string,
  data?: unknown,
  withCredentials = true
) => {
  return await axios(appConfig.baseUrl + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    withCredentials,
    data: JSON.stringify(data),
  })
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
    .catch(error => console.error(error))
}

export const GET = async (url: string, withCredentials = true) => {
  return await axios(appConfig.baseUrl + url, {
    method: 'GET',
    withCredentials,
  })
    .then(res => {
      if (res.status !== 200) {
        throw new Error('Error. Please try again')
      }
      return res?.data
    })
    .catch(error => console.error(error))
}

export const PUT = async (
  url: string,
  data?: unknown,
  imageUpload = false,
  withCredentials = true
) => {
  return await axios(appConfig.baseUrl + url, {
    method: 'PUT',
    headers: {
      'Content-Type': imageUpload
        ? 'multipart/form-data'
        : 'application/json; charset=UTF-8',
    },
    withCredentials,
    data: imageUpload ? data : JSON.stringify(data),
  })
    .then(res => {
      if (res.status !== 200) {
        throw new Error('Error. Please try again')
      }
      return res?.data
    })
    .catch(error => console.error(error))
}
