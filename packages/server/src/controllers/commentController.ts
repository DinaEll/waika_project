import { User } from '@waika_project/database';
import { Comment, Reply } from '@waika_project/database/src';
import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../middlewares/error';

interface CreateCommentRequest {
  content: string;
  user_id: number;
  topic_id: number;
}

class CommentController {
  create = async (
    req: Request<CreateCommentRequest>,
    res: Response,
    next: NextFunction,
  ) => {
    const { content, user_id, topic_id } = req.body as CreateCommentRequest;
    try {
      if (!content || !user_id || !topic_id) {
        throw new ApiError(400, 'All fields are required');
      }
      const comment = await Comment.create({
        content,
        user_id,
        topic_id,
      });
      res.send(comment);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const { topic_id } = req.query;
    if (!topic_id) {
      throw new ApiError(400, 'Query params should have topic_id');
    }
    try {
      const comments = await Comment.findAll({
        where: { topic_id },
        include: [
          { model: User, as: 'user' },
          { model: Reply, as: 'replies' },
        ],
      });
      res.json(comments);
    } catch (error) {
      next(error);
    }
  };
}

export const commentController = new CommentController();
