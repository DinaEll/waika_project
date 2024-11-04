import { Comment } from '@ant-design/compatible';
import { Button, Form, Input, Tooltip, Typography } from 'antd';
import moment from 'moment';
import { type FC, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTopic } from '@/shared/api/forum/getTopic';
import { appConfig } from '@/shared/config';
import { useEffectOnce, usePage } from '@/shared/hooks';
import { BaseUserInfo, TopicResponse } from '@/shared/interfaces/ForumResponse';
import { useAppSelector } from '@/shared/store/hooks';
import { userSelector } from '@/shared/store/user/user.selector';
import { UserAvatar } from '@/shared/ui';
import { initPageBase, isDefined } from '@/shared/utils';
import { MainContainer } from '@/widgets';
import { initialReplyFormData, replyFormData } from '../model/forumTopicData';
import cls from './ForumTopicPage.module.scss';

export const ForumTopicPage: FC = () => {
  const [pageTitle, setPageTitle] = useState('');
  const user = useAppSelector(userSelector);
  console.log(user);

  const params = useParams() as { topicId: string };
  const [topic, setTopic] = useState<TopicResponse | null>(null);

  usePage({ initPage: initPageBase });

  const [form] = Form.useForm();

  useEffectOnce(() => {
    setPageTitle('Doom 666');

    getTopic(params.topicId)
      .then((response) => {
        setTopic(response);
        console.log(topic, response);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  const handleCreateComment = (values: replyFormData) => {
    // todo загрузить ответ на сервер и добавить к списку
    console.log('Success:', values);
  };

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
        {topic?.comments.map((comment) => (
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
            />

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
                ? `${appConfig.baseUrl}/resources${user.avatar}`
                : ''
            }
          />
        </div>

        <Form
          className={cls.replyForm}
          layout="vertical"
          onFinish={handleCreateComment}
          form={form}
          initialValues={initialReplyFormData}
        >
          <Form.Item name={'reply'}>
            <Input.TextArea id="reply" placeholder="Your reply" rows={5} />
          </Form.Item>

          <Form.Item className={cls.formFooter}>
            <Button type="primary" htmlType="submit">
              Add Reply
            </Button>
          </Form.Item>
        </Form>
      </div>
    </MainContainer>
  );
};
