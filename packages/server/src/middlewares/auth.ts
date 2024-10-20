import { NextFunction, Request, Response } from 'express';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const cookies = req.headers.cookie ?? '';

  fetch('https://ya-praktikum.tech/api/v2/auth/user', {
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
