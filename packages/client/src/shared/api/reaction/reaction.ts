import { get, post, put } from '@/shared/api';
import { appConfig } from '@/shared/config';
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
    `${appConfig.baseUrl}/${data.field}/${data.id}/reactions`,
  );
};

export const deleteReaction = async (data: ReactionRequest) => {
  return await put<ReactionResponse[] | []>(`${appConfig.baseUrl}/reaction`, {
    data,
  });
};
