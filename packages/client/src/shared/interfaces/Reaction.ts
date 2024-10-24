import { TopicFieldEnum } from '@/shared/enums/TopicField.enum';

export interface ReactionRequest {
  id: number;
  field: TopicField;
  user_id: number;
  reaction: string;
}

export interface getAllReactionsRequest {
  id: number;
  field: TopicField;
}

export interface ReactionResponse {
  emoji: string;
  count: number;
  userIds: number[];
}

export type TopicField = TopicFieldEnum;
