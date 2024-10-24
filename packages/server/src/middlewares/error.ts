/* eslint-disable @typescript-eslint/no-unused-vars */
import { logError } from '@waika_project/utils';
import type { Request, Response, NextFunction } from 'express';

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super();
    this.status = status;
    this.message = message;
  }
}

export function error(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  logError(err.stack);
  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message });
  }

  res.status(500).json({ message: 'Internal Server Error' });
}
