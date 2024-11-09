import { get } from '@/shared/api';
import { TopicResponse } from '@/shared/interfaces/ForumResponse';

export const getTopic = async (topicId: string) => {
  return await get<TopicResponse>(
    `${__API_BASE_URL__}/forum/topic?topic_id=${topicId}`,
  );
};
