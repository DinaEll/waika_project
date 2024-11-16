import { API_PRACTICUM_URL } from '../../env';
import type { NextFunction, Request, Response } from '@waika_project/server';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const cookies = req.headers.cookie ?? '';

  fetch(`${API_PRACTICUM_URL}/auth/user`, {
    headers: {
      cookie: cookies,
    },
  })
    .then((result) => {
      console.log('STATUS', result.status);
      if (result.status === 401) {
        res.sendStatus(403);
      } else {
        next();
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
