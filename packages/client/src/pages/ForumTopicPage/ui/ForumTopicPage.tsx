import { Comment } from '@ant-design/compatible';
import { Form, Tooltip, Typography } from 'antd';
import moment from 'moment';
import { type FC, useCallback, useState } from 'react';
import { useParams } from 'react-router-dom';
import { createComment } from '@/shared/api/forum/createComment';
import { createReply } from '@/shared/api/forum/createReply';
import { getTopic } from '@/shared/api/forum/getTopic';
import { incrementViews } from '@/shared/api/forum/incrementViews';
import { useEffectOnce, usePage } from '@/shared/hooks';
import { BaseUserInfo, TopicResponse } from '@/shared/interfaces/ForumResponse';
import { useAppSelector } from '@/shared/store/hooks';
import { userSelector } from '@/shared/store/user/user.selector';
import { UserAvatar } from '@/shared/ui';
import { ReplyForm } from '@/shared/ui/ReplyForm/ReplyForm';
import { initPageBase, isDefined } from '@/shared/utils';
import { MainContainer } from '@/widgets';
import { initialReplyFormData } from '../model/forumTopicData';
import cls from './ForumTopicPage.module.scss';

export const ForumTopicPage: FC = () => {
  const [pageTitle, setPageTitle] = useState('');
  const user = useAppSelector(userSelector);
  const params = useParams() as { topicId: string };
  const [topic, setTopic] = useState<TopicResponse | null>(null);
  const [isReplyOpen, setIsReplyOpen] = useState<{ open: boolean; id: number }>(
    { open: false, id: 0 },
  );

  usePage({ initPage: initPageBase });
  const [form] = Form.useForm();
  const [replyForm] = Form.useForm();

  useEffectOnce(() => {
    getTopic(params.topicId)
      .then(async (response) => {
        setTopic(response);
        setPageTitle(response.title);

        await incrementViews(String(response.topic_id));
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const handleCreateComment = useCallback(
    async (values: FormData) => {
      try {
        if (!user || !topic) {
          throw new Error('User or topic is not defined');
        }
        if (!('reply' in values)) {
          return;
        }

        const commentData = {
          user_id: user?.id,
          content: String(values.reply),
          topic_id: topic.topic_id,
        };
        const comment = await createComment(commentData);
        setTopic({
          ...topic,
          comments: [
            ...topic.comments,
            {
              ...comment,
              user: {
                user_id: user.id,
                display_name: user.display_name,
                first_name: user.first_name,
                second_name: user.second_name,
                avatar: user.avatar,
              },
              replies: [],
            },
          ],
        });
        form.resetFields();
      } catch (error) {
        console.error(error);
      }
    },
    [form, topic, user],
  );

  const handleCreateReply = useCallback(
    async (values: FormData, commentId: number) => {
      try {
        if (!user || !topic) {
          throw new Error('User or topic is not defined');
        }
        if (!('reply' in values)) {
          return;
        }

        const replyData = {
          user_id: user?.id,
          content: String(values.reply),
          comment_id: commentId,
        };
        const reply = await createReply(replyData);
        setTopic({
          ...topic,
          comments: [
            ...topic.comments.map((comment) => {
              if (comment.comment_id === commentId) {
                return {
                  ...comment,
                  replies: [
                    ...comment.replies,
                    {
                      ...reply,
                      user: {
                        user_id: user.id,
                        display_name: user.display_name,
                        first_name: user.first_name,
                        second_name: user.second_name,
                        avatar: user.avatar,
                      },
                    },
                  ],
                };
              }
              return comment;
            }),
          ],
        });
        replyForm.resetFields();
      } catch (error) {
        console.error(error);
      }
    },
    [replyForm, topic, user],
  );

  const name = (user: BaseUserInfo | undefined) => {
    if (!user) {
      return '';
    }
    return user.display_name
      ? user.display_name
      : user.first_name + ' ' + user.second_name;
  };

  return (
    <MainContainer title={pageTitle}>
      <Comment
        author={<p>{name(topic?.user)}</p>}
        avatar={
          <div className={cls.replyAvatar}>
            <UserAvatar src={topic?.user.avatar} />
          </div>
        }
        content={<p>{topic?.content}</p>}
        datetime={
          <Tooltip
            title={moment(topic?.created_at).format('DD-MM-YYYY HH:mm:ss')}
          >
            <span>{moment(topic?.created_at).fromNow()}</span>
          </Tooltip>
        }
        className={cls.main}
      />

      <div className={cls.repliesCount}>
        <Typography.Text>{topic?.comments.length} Replies</Typography.Text>
      </div>

      <div className={cls.replies}>
        {topic?.comments
          .sort((a, b) => {
            const date1 = new Date(a.created_at);
            const date2 = new Date(b.created_at);
            return Number(date1) - Number(date2);
          })
          .map((comment) => (
            <div key={comment.comment_id}>
              <Comment
                author={<a>{name(comment.user)}</a>}
                avatar={
                  <div className={cls.replyAvatar}>
                    <UserAvatar src={comment.user.avatar} />
                  </div>
                }
                content={<p>{comment.content}</p>}
                datetime={
                  <Tooltip
                    title={moment(comment.created_at).format(
                      'YYYY-MM-DD HH:mm:ss',
                    )}
                  >
                    <span>{moment(comment.created_at).fromNow()}</span>
                  </Tooltip>
                }
              >
                <div className={cls.replyes}>
                  {comment.replies.length > 0 &&
                    comment.replies.map((reply) => (
                      <Comment
                        key={reply.reply_id}
                        author={<a>{name(reply.user)}</a>}
                        avatar={
                          <div className={cls.replyAvatar}>
                            <UserAvatar src={reply.user.avatar} />
                          </div>
                        }
                        content={<p>{reply.content}</p>}
                        datetime={
                          <Tooltip
                            title={moment(reply.created_at).format(
                              'YYYY-MM-DD HH:mm:ss',
                            )}
                          >
                            <span>{moment(reply.created_at).fromNow()}</span>
                          </Tooltip>
                        }
                      />
                    ))}
                  <div className={cls.replyActions}>
                    <a
                      onClick={() =>
                        setIsReplyOpen({ open: true, id: comment.comment_id })
                      }
                    >
                      Reply
                    </a>
                    {isReplyOpen.open &&
                      isReplyOpen.id === comment.comment_id && (
                        <div className={cls.replyFormWrapper}>
                          {/* todo загружать аватар текущего пользователя */}
                          <div className={cls.replyAvatar}>
                            <UserAvatar
                              src={
                                isDefined(user?.avatar)
                                  ? `${__API_BASE_URL__}/resources/${user.avatar}`
                                  : ''
                              }
                            />
                          </div>

                          <ReplyForm
                            form={replyForm}
                            onFinish={(values) => {
                              void handleCreateReply(
                                values,
                                comment.comment_id,
                              );
                            }}
                            buttonText="Add reply"
                            placeholder="Your reply"
                            initialValues={initialReplyFormData}
                          />
                        </div>
                      )}
                  </div>
                </div>
              </Comment>

              {/* <ButtonReaction
              id={comment.comment_id}
              topicField={TopicFieldEnum.comments}
              initialReactions={comment.reactions}
              currentUserId={user?.id}
            /> */}
            </div>
          ))}
      </div>

      <div className={cls.replyFormWrapper}>
        {/* todo загружать аватар текущего пользователя */}
        <div className={cls.replyAvatar}>
          <UserAvatar
            src={
              isDefined(user?.avatar)
                ? `${__API_BASE_URL__}/resources${user.avatar}`
                : ''
            }
          />
        </div>

        <ReplyForm
          form={form}
          onFinish={(values) => {
            void handleCreateComment(values);
          }}
          buttonText="Add comment"
          placeholder="Your comment"
          initialValues={initialReplyFormData}
        />
      </div>
    </MainContainer>
  );
};
