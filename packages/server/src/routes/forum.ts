import { Comment, Reply } from '@waika_project/database/src';
import { NextFunction, Router, type Request, type Response } from 'express';
import { topicController } from '../controllers/topicController';
import { userController } from '../controllers/userController';

export const forum = Router();

forum.post('/user', userController.create);
forum.get('/user', userController.getOne); // ?user_id=
forum.get('/users', userController.getAll);

forum.post('/topic', topicController.create);
forum.get('/topic', topicController.getOne); // ?topic_id= || ?title=
forum.get('/topics', topicController.getAll);

forum.post(
  '/comment',
  async (_: Request, res: Response, next: NextFunction) => {
    try {
      const topic = await Comment.create({
        content: 'comment 2',
        user_id: 1,
        topic_id: 1,
      });
      res.send(topic);
    } catch (error) {
      next(error);
    }
  },
);

forum.post('/reply', async (_: Request, res: Response, next: NextFunction) => {
  try {
    const topic = await Reply.create({
      content: 'reply 1',
      user_id: 1,
      comment_id: 6,
    });
    res.send(topic);
  } catch (error) {
    next(error);
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
