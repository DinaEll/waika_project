import axios, { AxiosResponse } from 'axios';
import { appConfig } from '@/shared/config';

type Response<T = unknown> = T;
type Request = Record<string, unknown>;

enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

export interface ReqOptions {
  method?: Method;
  headers?: Record<string, string>;
  data?: Record<string, unknown>;
}

type HTTPMethod = <T = unknown>(
  url: string,
  options?: Request,
) => Promise<Response<T>>;

export const post: HTTPMethod = async <T>(
  url: string,
  options: Request = {},
) => {
  const { fileUpload = false, data } = options;
  const response = await baseRequest<T>(
    url,
    Method.POST,
    {
      'Content-Type': fileUpload
        ? 'multipart/form-data'
        : 'application/json; charset=UTF-8',
    },
    {
      data: fileUpload ? data : JSON.stringify(data),
    },
  );

  if (response.status !== 200) {
    throw new Error('Error. Please try again');
  }

  return parseResponse<T>(response.data);
};

export const get: HTTPMethod = async <T>(url: string) => {
  const response = await baseRequest<T>(url, Method.GET);

  if (response.status !== 200) {
    throw new Error('Error. Please try again');
  }

  return response.data;
};

export const put: HTTPMethod = async <T>(
  url: string,
  options: Request = {},
) => {
  const { fileUpload = false, data } = options;
  let formData: FormData | null = null;

  if (fileUpload) {
    formData = new FormData();
    try {
      for (const [key, value] of Object.entries(data as Record<string, File>)) {
        formData.append(key, value);
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  const response = await baseRequest<T>(
    url,
    Method.PUT,
    {
      'Content-Type': fileUpload
        ? 'multipart/form-data'
        : 'application/json; charset=UTF-8',
    },
    { data: fileUpload ? formData : JSON.stringify(data) },
  );

  if (response.status !== 200) {
    throw new Error('Error. Please try again');
  }

  return response.data;
};

const baseRequest = async <T>(
  url: string,
  method: ReqOptions['method'],
  headers?: ReqOptions['headers'],
  data?: Request,
): Promise<AxiosResponse<T>> => {
  return axios<T>(appConfig.baseUrl + url, {
    method,
    headers,
    ...data,
    withCredentials: true,
  });
};

function parseResponse<T>(data: unknown): T {
  if (typeof data === 'string') {
    try {
      return JSON.parse(data) as T;
    } catch {
      return data as T;
    }
  }
  return data as T;
}
