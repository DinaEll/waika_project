import axios, { type AxiosResponse } from 'axios';

type Response<T = unknown> = T;
type Request = Record<string, unknown>;

const enum Method {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

type HTTPRequest = Request & {
  signal?: AbortSignal;
  headers?: Record<string, string>;
  fileUpload?: boolean;
};

type HTTPMethod = <T = unknown>(
  url: string,
  options?: HTTPRequest,
) => Promise<Response<T>>;

export const post: HTTPMethod = async <T>(
  url: string,
  options: HTTPRequest = {},
) => {
  const { fileUpload = false, data, signal } = options;
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
      signal,
    },
  );

  if (response.status !== 200) {
    throw new Error('Error. Please try again');
  }

  return parseResponse<T>(response.data);
};

export const get: HTTPMethod = async <T>(
  url: string,
  options: HTTPRequest = {},
) => {
  const { signal, headers } = options;
  const response = await baseRequest<T>(url, Method.GET, headers, { signal });

  if (response.status !== 200) {
    throw new Error('Error. Please try again');
  }

  return response.data;
};

export const put: HTTPMethod = async <T>(
  url: string,
  options: HTTPRequest = {},
) => {
  const { fileUpload = false, data, signal } = options;
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
    { data: fileUpload ? formData : JSON.stringify(data), signal },
  );

  if (response.status !== 200) {
    throw new Error('Error. Please try again');
  }

  return response.data;
};

const baseRequest = async <T>(
  url: string,
  method: Method,
  headers?: Record<string, string>,
  data?: HTTPRequest,
): Promise<AxiosResponse<T>> => {
  return axios<T>(`${__API_BASE_URL__}${url}`, {
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
