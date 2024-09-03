import { LogoWithModal } from '@/widgets/LogoWithModal';
import cls from './ForumTopicPage.module.scss';
import { Button, Form, Input, Tooltip, Typography } from 'antd';
import { Comment } from '@ant-design/compatible';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { UserAvatar } from '@/shared/ui';
import {
  forumPageDataMock,
  initialReplyFormData,
  replyFormData,
} from '../model/forumTopicData';

// todo добавить функцию загрузки данных топика
const getTopic = () => {
  fetch('');
};

export const ForumTopicPage = () => {
  const [pageTitle, setPageTitle] = useState('');
  const [forumPageData, setForumPageData] = useState(forumPageDataMock);

  useEffect(() => {
    // getTopic().then(data => {
    //     setForumPageData(data)
    // })
    setPageTitle('Doom 666');
  }, []);

  const [form] = Form.useForm();

  const handleCreateThread = (values: replyFormData) => {
    // todo загрузить ответ на сервер и добавить к списку
    console.log('Success:', values);
  };

  return (
    <LogoWithModal
      open={true}
      centered={true}
      closable={false}
      footer={null}
      width={500}
      mask={false}
      transitionName={''}
      title={
        <Typography.Title level={3} className={cls.noMargin}>
          {pageTitle}
        </Typography.Title>
      }
    >
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
          <Comment
            key={comment.id}
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
    </LogoWithModal>
  );
};
