export interface ReactionRequest {
  comment_id?: number;
  user_id: number;
  reaction: string;
}

export interface getAllReactionsRequest {
  comment_id: number;
}

export interface ReactionResponse {
  count: number;
  emoji: string;
}
