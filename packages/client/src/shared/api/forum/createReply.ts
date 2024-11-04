import { post } from '@/shared/api';
import { Reply } from '@/shared/interfaces/ForumResponse';

export const createReply = async (
  commentData: Pick<Reply, 'user_id' | 'content' | 'comment_id'>,
): Promise<Reply> => {
  return await post(`http://localhost:3001/forum/reply`, { data: commentData });
};
