import { get } from '@/shared/api';
import { TopicResponse } from '@/shared/interfaces/ForumResponse';

export const getTopic = async (topicId: string) => {
  return await get<TopicResponse>(
    `http://localhost:3001/forum/topic?topic_id=${topicId}`,
  );
};
