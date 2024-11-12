import { post } from '@/shared/api';
import { Comment } from '@/shared/interfaces/ForumResponse';

export const createComment = async (
  commentData: Pick<Comment, 'user_id' | 'content' | 'topic_id'>,
): Promise<Comment> => {
  return await post(`/forum/comment`, {
    data: commentData,
  });
};
