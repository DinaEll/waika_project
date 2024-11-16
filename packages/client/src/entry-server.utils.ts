import fs from 'fs/promises';
import path from 'path';
import { extractStyle } from '@ant-design/cssinjs';
import { Request as ExpressRequest } from '@waika_project/server';
import { logError } from '@waika_project/utils';
import type Entity from '@ant-design/cssinjs/lib/Cache';

export const createUrl = (req: ExpressRequest) => {
  const origin = `${req.protocol}://${req.get('host')}`;

  return new URL(req.originalUrl || req.url, origin);
};

export const createFetchRequest = (req: ExpressRequest) => {
  const url = createUrl(req);

  const controller = new AbortController();
  req.on('close', () => controller.abort());

  const headers = new Headers();

  for (const [key, values] of Object.entries(req.headers)) {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (values) {
      if (Array.isArray(values)) {
        for (const value of values) {
          headers.append(key, value);
        }
      } else {
        headers.set(key, values);
      }
    }
  }

  const init: {
    method: string;
    headers: Headers;
    signal: AbortSignal;
    body?: BodyInit;
  } = {
    method: req.method,
    headers,
    signal: controller.signal,
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    init.body = req.body;
  }

  return new Request(url.href, init);
};

//use https://ant.design/docs/react/server-side-rendering#whole-export
interface DoExtraStyleOptions {
  cache: Entity;
  dir?: string;
  baseFileName?: string;
}

export const getStylePath = async ({
  cache,
  dir = 'antd-output',
  baseFileName = 'antd.min',
}: DoExtraStyleOptions) => {
  const publicPath = path.resolve(import.meta.dirname, '../dist/client');
  const cssDirPath = path.join(publicPath, dir);
  await createDir(cssDirPath);

  const css = extractStyle(cache, true);
  if (!css) return '';

  const cssFileName = `${baseFileName}.css`;
  const cssFilePath = path.join(cssDirPath, cssFileName);
  await writeFile(cssFilePath, css);

  const cssUrl = `/${dir}/${cssFileName}`;
  return cssUrl;
};

async function createDir(dir: string) {
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

async function writeFile(pathToFile: string, content: string) {
  try {
    await fs.writeFile(pathToFile, content);
  } catch (error) {
    logError(error);
  }
}
