import { Router } from 'express';
import { commentController } from '../controllers/commentController';
import { replyController } from '../controllers/replyController';
import { topicController } from '../controllers/topicController';
import { userController } from '../controllers/userController';

export const forum = Router();

forum.post('/user', userController.create);
forum.get('/user', userController.getOne); // ?user_id=
forum.get('/users', userController.getAll);

forum.post('/topic', topicController.create);
forum.get('/topic', topicController.getOne); // ?topic_id= || ?title=
forum.get('/topics', topicController.getAll);

forum.post('/comment', commentController.create);
forum.get('/comments', commentController.getAll); // ?topic_id=

forum.post('/reply', replyController.create);
forum.get('/replies', replyController.getAll); // ?comment_id=
