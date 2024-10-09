/* eslint-disable @typescript-eslint/no-unused-vars */
import { logError } from '@waika_project/utils';
import type { Request, Response, NextFunction } from 'express';

export function error(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  logError(err.stack);

  res.status(500).send('Internal Server Error');
}
