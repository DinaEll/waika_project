import { Badge, Button, List, Typography } from 'antd';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTopics } from '@/shared/api/forum/getAllTopics';
import { getPageUrl } from '@/shared/config';
import { useEffectOnce } from '@/shared/hooks';
import { TopicsListResponse } from '@/shared/interfaces/ForumResponse';
import { ForumPageStages } from '../../model/forumData';
import cls from '../ForumPage.module.scss';

interface Props {
  changeStage: (stage: ForumPageStages) => void;
}

export const ForumTopicsList: FC<Props> = ({ changeStage }) => {
  const navigate = useNavigate();
  const [forumTopicsList, setForumTopicsList] = useState<TopicsListResponse[]>(
    [],
  );

  useEffectOnce(() => {
    getAllTopics()
      .then((response) => {
        setForumTopicsList(response);
      })
      .catch((error) => {
        console.error(error);
      });
  });

  return (
    <List
      className={cls.list}
      header={
        <div className={cls.header}>
          <Typography.Text
            className={cls.headerTitle + ' ' + cls.headerTitleFirst}
          >
            Author
          </Typography.Text>
          <Typography.Text className={cls.headerTitle}>Replies</Typography.Text>
          <Typography.Text className={cls.headerTitle}>Views</Typography.Text>
        </div>
      }
      footer={
        <div className={cls.footer}>
          <Button
            type="primary"
            onClick={() => changeStage(ForumPageStages.createThread)}
          >
            Create New Thread
          </Button>
        </div>
      }
      dataSource={forumTopicsList}
      renderItem={(forumTopic) => (
        <List.Item
          onClick={() =>
            navigate(
              getPageUrl('forum-topic', { topicId: forumTopic.topic_id }),
            )
          }
          className={cls.listItem}
        >
          <Typography.Text className={cls.title}>
            {forumTopic.title}
          </Typography.Text>

          <div className={cls.listContent}>
            <Typography.Text className={cls.author}>
              {forumTopic.user.display_name}
            </Typography.Text>

            <div className={cls.badgeWrapper}>
              <Badge
                count={forumTopic.comments.length}
                showZero
                overflowCount={99}
                className={cls.badge}
                color="#F0F0F0"
              />
            </div>

            <div className={cls.badgeWrapper}>
              <Badge
                count={forumTopic.views}
                showZero
                overflowCount={99}
                className={cls.badge}
                color="#F0F0F0"
              />
            </div>
          </div>
        </List.Item>
      )}
    />
  );
};
