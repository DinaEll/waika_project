/* eslint-disable @typescript-eslint/no-unsafe-return */
import { appConfig } from '@/shared/config';

export const POST = async (
  url: string,
  data: unknown,
  credentials: RequestCredentials = 'include',
) => {
  return await fetch(appConfig.baseUrl + url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json; charset=UTF-8',
    },
    credentials,
    body: JSON.stringify(data),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Error. Please try again');
      }
      return res.text();
    })
    .then((text) => {
      try {
        return JSON.parse(text);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        return text;
      }
    })
    .catch((error) => console.error(error));
};

export const GET = async (
  url: string,
  credentials: RequestCredentials = 'include',
) => {
  return await fetch(appConfig.baseUrl + url, {
    method: 'GET',
    credentials,
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Error. Please try again');
      }
      return res.json();
    })
    .catch((error) => console.error(error));
};
