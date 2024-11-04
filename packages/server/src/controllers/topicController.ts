import { Comment, Reply, Topic, User } from '@waika_project/database/src';
import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../middlewares/error';

interface CreateTopicRequest {
  title: string;
  user_id: number;
  content: string;
}

class TopicController {
  create = async (
    req: Request<CreateTopicRequest>,
    res: Response,
    next: NextFunction,
  ) => {
    const { title, user_id, content } = req.body as CreateTopicRequest;
    try {
      if (!title || !user_id || !content) {
        throw new ApiError(400, 'All fields are required');
      }
      const topic = await Topic.create({
        title,
        user_id,
        views: 0,
        content,
      });
      res.json(topic);
    } catch (error) {
      next(error);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    const { topic_id } = req.query;
    try {
      let topics;
      topics = 1;

      const userAttributes = [
        'user_id',
        'display_name',
        'first_name',
        'second_name',
        'avatar',
      ];

      if (!topic_id) {
        throw new ApiError(400, 'Query params should have title or topic_id');
      }

      topics = await Topic.findOne({
        where: { topic_id: topic_id },
        include: [
          { model: User, attributes: userAttributes },
          {
            model: Comment,
            include: [
              { model: User, attributes: userAttributes },
              {
                model: Reply,
                include: [{ model: User, attributes: userAttributes }],
              },
            ],
          },
        ],
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
      const topics = await Topic.findAll({
        order: [['topic_id', 'ASC']],
        include: [
          // TODO заменить комменты их количеством
          Comment,
          {
            model: User,
            attributes: [
              'user_id',
              'display_name',
              'first_name',
              'second_name',
            ],
          },
        ],
      });
      res.json(topics);
    } catch (error) {
      next(error);
    }
  };

  incrementViews = async (req: Request, res: Response, next: NextFunction) => {
    const { topic_id } = req.query;
    try {
      if (!topic_id) {
        throw new ApiError(400, 'Query params should have topic_id');
      }
      const topic = await Topic.increment('views', {
        where: { topic_id: topic_id },
      });
      res.json(topic);
    } catch (error) {
      next(error);
    }
  };
}

export const topicController = new TopicController();
