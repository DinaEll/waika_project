import { User } from '@waika_project/database';
import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../middlewares/error';

interface CreateUserRequest {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
  avatar: string;
}

class UserController {
  create = async (
    req: Request<CreateUserRequest>,
    res: Response,
    next: NextFunction,
  ) => {
    const {
      first_name,
      second_name,
      display_name,
      login,
      email,
      phone,
      avatar,
    } = req.body as CreateUserRequest;
    try {
      if (!first_name || !second_name || !display_name || !login || !email) {
        throw new ApiError(400, 'All fields are required');
      }
      const user = await User.create({
        first_name,
        second_name,
        display_name,
        login,
        email,
        phone,
        avatar,
      });

      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    const { user_id } = req.query;
    if (!user_id) {
      throw new ApiError(400, 'Query params should have user_id');
    }
    try {
      const user = await User.findOne({ where: { user_id } });
      if (!user) {
        throw new ApiError(404, 'User not found');
      }
      res.json(user);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      next(error);
    }
  };
}

export const userController = new UserController();
