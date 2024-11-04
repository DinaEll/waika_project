import { put } from '@/shared/api';
import { TopicResponse } from '@/shared/interfaces/ForumResponse';

export const incrementViews = async (topicId: string) => {
  return await put<TopicResponse>(
    `http://localhost:3001/forum/topic/increment-views?topic_id=${topicId}`,
  );
};
