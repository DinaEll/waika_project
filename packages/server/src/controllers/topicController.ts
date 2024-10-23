import { Comment, Topic, User } from '@waika_project/database/src';
import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../middlewares/error';

interface CreateTopicRequest {
  title: string;
  user_id: number;
  views: number;
  content: string;
}

class TopicController {
  create = async (
    req: Request<CreateTopicRequest>,
    res: Response,
    next: NextFunction,
  ) => {
    const { title, user_id, views, content } = req.body as CreateTopicRequest;
    try {
      if (!title || !user_id || !views || !content) {
        throw new ApiError(400, 'All fields are required');
      }
      const topic = await Topic.create({
        title,
        user_id,
        views,
        content,
      });
      res.json(topic);
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    const { topic_id, title } = req.query;
    try {
      let topics;
      topics = 1;

      if (!topic_id && !title) {
        throw new ApiError(400, 'Query params should have title or topic_id');
      }

      topics = await Topic.findOne({
        where: topic_id ? { topic_id } : { title },
        include: [User],
      });

      if (!topics) {
        throw new ApiError(404, 'Topic not found');
      }
      res.json(topics);
    } catch (error) {
      next(error);
    }
  };
  getAll = async (_: Request, res: Response, next: NextFunction) => {
    try {
      const topics = await Topic.findAll({ include: [Comment] });
      res.json(topics);
    } catch (error) {
      next(error);
    }
  };
}

export const topicController = new TopicController();
