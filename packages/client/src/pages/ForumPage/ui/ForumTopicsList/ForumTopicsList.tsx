import { Badge, Button, List, Typography } from 'antd';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPageUrl } from '@/shared/config';
import { ForumPageStages, ForumTopicData } from '../../model/forumData';
import cls from '../ForumPage.module.scss';

interface Props {
  changeStage: (stage: ForumPageStages) => void;
  forumTopicsList: ForumTopicData[];
}

export const ForumTopicsList: FC<Props> = ({
  changeStage,
  forumTopicsList,
}) => {
  const navigate = useNavigate();

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
            navigate(getPageUrl('forum-topic', { topicId: forumTopic.id }))
          }
          className={cls.listItem}
        >
          <Typography.Text className={cls.title}>
            {forumTopic.title}
          </Typography.Text>

          <div className={cls.listContent}>
            <Typography.Text className={cls.author}>
              {forumTopic.author}
            </Typography.Text>

            <div className={cls.badgeWrapper}>
              <Badge
                count={forumTopic.replies}
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
