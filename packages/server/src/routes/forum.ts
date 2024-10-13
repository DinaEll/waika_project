import { User } from '@waika_project/database';
import { Comment, Reply, Topic } from '@waika_project/database/src';
import { NextFunction, Router, type Request, type Response } from 'express';

export const forum = Router();

forum.get('/users', async (_: Request, res: Response) => {
  const users = await User.findAll();
  res.send(users);
});

forum.post('/user', async (_: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.create({
      first_name: '1John',
      second_name: '1Doe',
      display_name: '1John Doe',
      login: '1John Doe',
      email: '1john1@example.com',
      phone: '1John Doe',
      // avatar: '1john@example1.com',
    });
    res.json(user);
  } catch (error) {
    // res.status(error.status).send(error);
    console.log(error);
    next(error);
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
      content: 'comment 2',
      user_id: 1,
      topic_id: 1,
    });
    res.send(topic);
  } catch (error) {
    res.send(error);
  }
});

forum.post('/reply', async (_: Request, res: Response) => {
  try {
    const topic = await Reply.create({
      content: 'reply 1',
      user_id: 1,
      comment_id: 6,
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
