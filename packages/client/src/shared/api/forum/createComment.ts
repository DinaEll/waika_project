import { post } from '@/shared/api';
import { Comment } from '@/shared/interfaces/ForumResponse';

export const createComment = async (
  commentData: Pick<Comment, 'user_id' | 'content' | 'topic_id'>,
): Promise<Comment> => {
  return await post(`${__API_BASE_URL__}/forum/comment`, {
    data: commentData,
  });
};
