import { User } from '@waika_project/database';
import { Comment, Topic } from '@waika_project/database/src';
import { Router, type Request, type Response } from 'express';

export const forum = Router();

forum.get('/users', async (_: Request, res: Response) => {
  const users = await User.findAll();
  res.send(users);
});

forum.post('/user', async (_: Request, res: Response) => {
  try {
    const user = await User.create({
      first_name: 'John',
      second_name: 'Doe',
      display_name: 'John Doe',
      login: 'John Doe',
      email: 'john1@example.com',
      phone: 'John Doe',
      avatar: 'john@example1.com',
    });
    res.json(user);
  } catch (error) {
    res.send(error);
  }
});

forum.post('/topic', async (_: Request, res: Response) => {
  try {
    const topic = await Topic.create({
      title: 'toopic 2',
      user_id: 1,
      views: 0,
      content: 'content 2',
    });
    res.send(topic);
  } catch (error) {
    res.send(error);
  }
});

forum.post('/comment', async (_: Request, res: Response) => {
  try {
    const topic = await Comment.create({
      content: 'comment 1',
      user_id: 1,
      topic_id: 5,
    });
    res.send(topic);
  } catch (error) {
    res.send(error);
  }
});

// forum.post('/topics', async (_: Request, res: Response) => {
//   const user = await User.create({
//     name: 'John Doe1',
//     email: 'john1@example.com',
//     password: '1password123',
//   });
//   res.send(user);
// });
