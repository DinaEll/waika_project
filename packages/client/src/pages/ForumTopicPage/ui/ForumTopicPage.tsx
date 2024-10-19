import { Comment } from '@ant-design/compatible';
import { Button, Form, Input, Tooltip, Typography } from 'antd';
import moment from 'moment';
import { type FC, useEffect, useState } from 'react';
import { usePage } from '@/shared/hooks';
import { UserAvatar } from '@/shared/ui';
import { initPageBase } from '@/shared/utils';
import { MainContainer } from '@/widgets';
import { ButtonReaction } from '@/widgets/ButtonReaction';
import {
  forumPageDataMock,
  initialReplyFormData,
  replyFormData,
} from '../model/forumTopicData';
import cls from './ForumTopicPage.module.scss';

export const ForumTopicPage: FC = () => {
  const [pageTitle, setPageTitle] = useState('');
  const [forumPageData] = useState(forumPageDataMock);

  usePage({ initPage: initPageBase });
  useEffect(() => {
    setPageTitle('Doom 666');
  }, []);

  const [form] = Form.useForm();

  const handleCreateThread = (values: replyFormData) => {
    // todo загрузить ответ на сервер и добавить к списку
    console.log('Success:', values);
  };

  return (
    <MainContainer title={pageTitle}>
      <Comment
        author={<p>{forumPageData.author.name}</p>}
        avatar={
          <div className={cls.replyAvatar}>
            <UserAvatar src={forumPageData.author.avatarSrc} />
          </div>
        }
        content={<p>{forumPageData.description}</p>}
        datetime={
          <Tooltip
            title={moment(forumPageData.date).format('DD-MM-YYYY HH:mm:ss')}
          >
            <span>{moment(forumPageData.date).fromNow()}</span>
          </Tooltip>
        }
        className={cls.main}
      />

      <div className={cls.repliesCount}>
        <Typography.Text>
          {forumPageData.comments.length} Replies
        </Typography.Text>
      </div>

      <div className={cls.replies}>
        {forumPageData.comments.map((comment) => (
          <div key={comment.id}>
            <Comment
              author={<a>{comment.author.name}</a>}
              avatar={
                <div className={cls.replyAvatar}>
                  <UserAvatar src={comment.author.avatarSrc} />
                </div>
              }
              content={<p>{comment.description}</p>}
              datetime={
                <Tooltip
                  title={moment(comment.date).format('YYYY-MM-DD HH:mm:ss')}
                >
                  <span>{moment(comment.date).fromNow()}</span>
                </Tooltip>
              }
            />

            <ButtonReaction comment_id={comment.id} />
          </div>
        ))}
      </div>

      <div className={cls.replyFormWrapper}>
        {/* todo загружать аватар текущего пользователя */}
        <div className={cls.replyAvatar}>
          <UserAvatar src="" />
        </div>

        <Form
          className={cls.replyForm}
          layout="vertical"
          onFinish={handleCreateThread}
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
