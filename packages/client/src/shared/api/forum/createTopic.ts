import { post } from '@/shared/api';
import { Topic } from '@/shared/interfaces/ForumResponse';

export const createTopic = async (
  topicData: Omit<Topic, 'created_at' | 'updated_at' | 'topic_id'>,
) => {
  return await post(`${__API_BASE_URL__}/forum/topic`, { data: topicData });
};
