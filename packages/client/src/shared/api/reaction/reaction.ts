import { get, post } from '@/shared/api';
import type { ReactionRequest } from '@/shared/interfaces';
import {
  getAllReactionsRequest,
  ReactionResponse,
} from '@/shared/interfaces/Reaction';

export const setReaction = async (data: ReactionRequest) => {
  return await post('/reaction', { data });
};

export const getAllReactions = async (data: getAllReactionsRequest) => {
  return await get<ReactionResponse[] | null>('/reactions', { data });
};
