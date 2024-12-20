import { get } from '@/shared/api';
import { TopicsListResponse } from '@/shared/interfaces/ForumResponse';

export const getAllTopics = async () => {
  return await get<TopicsListResponse[]>(`/forum/topics`);
};
