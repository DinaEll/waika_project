import { type Request, type Response } from '@waika_project/server';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { API_PRACTICUM_URL } from '../../env';

const paths: string[] = ['/auth', '/oauth', '/user'];

export const yandexProxyMiddleware = createProxyMiddleware<Request, Response>({
  target: API_PRACTICUM_URL,
  pathFilter: paths,
  secure: true,
  changeOrigin: true,
  proxyTimeout: 10000,
  timeout: 10000,
  cookieDomainRewrite: {
    '*': '',
  },
  on: {
    proxyRes: (proxyRes) => {
      const cookies = proxyRes.headers['set-cookie'];
      if (cookies) {
        proxyRes.headers['set-cookie'] = cookies.map((cookie: string) =>
          cookie.replace('SameSite=Lax', 'SameSite=None; Secure'),
        );
      }
    },
    error: (error) => {
      console.error('Proxy error:', error);
    },
  },
});
