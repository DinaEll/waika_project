import { User } from '@waika_project/database';
import { Router, type Request, type Response } from 'express';

export const forum = Router();

forum.get('/', async (_: Request, res: Response) => {
  const users = await User.findAll();
  res.send(users);
});

forum.get('/topics', async (_: Request, res: Response) => {
  const user = await User.create({
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
  });
  res.send(user);
});
