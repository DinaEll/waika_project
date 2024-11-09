import { get, post, put } from '@/shared/api';
import type { ReactionRequest } from '@/shared/interfaces';
import {
  getAllReactionsRequest,
  ReactionResponse,
} from '@/shared/interfaces/Reaction';

export const addReaction = async (data: ReactionRequest) => {
  return await post('/reaction', { data });
};

export const getAllReactions = async (data: getAllReactionsRequest) => {
  return await get<ReactionResponse[] | []>(
    `${__API_PRACTICUM_URL__}/${data.field}/${data.id}/reactions`,
  );
};

export const deleteReaction = async (data: ReactionRequest) => {
  return await put<ReactionResponse[] | []>(
    `${__API_PRACTICUM_URL__}/reaction`,
    {
      data,
    },
  );
};
