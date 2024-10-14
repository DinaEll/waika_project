import { Reply, User } from '@waika_project/database/src';
import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../middlewares/error';

interface CreateReplyRequest {
  content: string;
  user_id: number;
  comment_id: number;
}

class ReplyController {
  create = async (
    req: Request<CreateReplyRequest>,
    res: Response,
    next: NextFunction,
  ) => {
    const { content, user_id, comment_id } = req.body as CreateReplyRequest;
    try {
      if (!content || !user_id || !comment_id) {
        throw new ApiError(400, 'All fields are required');
      }
      const reply = await Reply.create({
        content,
        user_id,
        comment_id,
      });
      res.json(reply);
    } catch (error) {
      next(error);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    const { comment_id } = req.query;
    if (!comment_id) {
      throw new ApiError(400, 'Query params should have topic_id');
    }
    try {
      const replies = await Reply.findAll({
        where: { comment_id },
        include: [User],
      });
      res.json(replies);
    } catch (error) {
      next(error);
    }
  };
}

export const replyController = new ReplyController();
