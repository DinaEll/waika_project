export interface BaseUserInfo {
  user_id: number;
  display_name: string;
  first_name: string;
  second_name: string;
  avatar: string;
}
export interface Reply {
  topic_id: number;
  title: string;
  user_id: number;
  views: number;
  content: string;
  created_at: string;
  updated_at: string;
  user: BaseUserInfo;
}

export interface Comment {
  comment_id: number;
  topic_id: number;
  title: string;
  user_id: number;
  views: number;
  content: string;
  created_at: string;
  updated_at: string;
  user: BaseUserInfo;
  replies: Reply[];
}

export interface Topic {
  topic_id: number;
  title: string;
  user_id: number;
  views: number;
  content: string;
  created_at: string;
  updated_at: string;
}

export type CreateTopicReq = Omit<
  Topic,
  'created_at' | 'updated_at' | 'topic_id'
>;

export interface TopicResponse extends Topic {
  user: BaseUserInfo;
  comments: Comment[];
}

export interface TopicsListResponse extends Topic {
  comments: Comment[];
  user: BaseUserInfo;
}
