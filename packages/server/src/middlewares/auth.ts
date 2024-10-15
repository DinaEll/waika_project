import { NextFunction, Request, Response } from 'express';
// import { ApiError } from "./error";

export const authMiddleware = (
  req: Request,
  _: Response,
  next: NextFunction,
) => {
  console.log(req.cookies);

  // fetch('https://ya-praktikum.tech/api/v2/auth/user', {
  //   credentials: "same-origin"
  // })
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  // }
  next();
};
