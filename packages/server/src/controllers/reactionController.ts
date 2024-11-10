import { Reaction, User } from '@waika_project/database/src';
import { NextFunction, Request, Response } from 'express';
import { Sequelize } from 'sequelize';
import { ApiError } from '../middlewares/error';

interface ReactionRequest {
  id: number;
  field: 'all' | 'comment' | 'reply';
  user_id: number;
  reaction: string;
}

class ReactionController {
  create = async (
    req: Request<ReactionRequest>,
    res: Response,
    next: NextFunction,
  ) => {
    const { id, field, user_id, reaction } = req.body as ReactionRequest;
    try {
      if (!id || !field || !user_id || !reaction) {
        throw new ApiError(400, 'Some data for reaction is absent');
      }

      const existingEmoji = await Reaction.findOne({
        where: {
          id,
          reaction,
          user_id,
        },
      });

      if (existingEmoji) {
        throw new ApiError(400, 'User already added this reaction');
      }

      const reply = await Reaction.create({
        id,
        field,
        user_id,
        reaction,
      });
      res.json(reply);
    } catch (error) {
      next(error);
    }
  };

  getAllReactions = async (req: Request, res: Response, next: NextFunction) => {
    const { id, field } = req.params;

    if (!id && !field) {
      throw new ApiError(400, 'Query params should have id and field');
    }
    try {
      const groupedReactions = await Reaction.findAll({
        where: { id },
        include: [
          {
            model: User,
            attributes: ['user_id'],
          },
        ],
        attributes: [
          'reaction',
          [Sequelize.fn('COUNT', Sequelize.col('reaction')), 'count'],
          [Sequelize.fn('GROUP_CONCAT', Sequelize.col('user_id')), 'userIds'],
        ],
        group: ['reaction'],
        raw: true,
      });
      res.json(groupedReactions);
    } catch (error) {
      next(error);
    }
  };
}

export const reactionController = new ReactionController();
