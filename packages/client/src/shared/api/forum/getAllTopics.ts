import { get } from '@/shared/api';
import { TopicsListResponse } from '@/shared/interfaces/ForumResponse';

export const getAllTopics = async () => {
  return await get<TopicsListResponse[]>(`http://localhost:3001/forum/topics`);
};
