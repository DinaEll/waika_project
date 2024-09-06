import { Badge, List, Typography } from 'antd';
import { FC } from 'react';
import { ForumData, ForumPageStages } from '../../model/forumData';
import cls from '../ForumPage.module.scss';

interface Props {
  changeStage: (stage: ForumPageStages) => void;
  forumsList: ForumData[];
}

export const ForumsList: FC<Props> = ({ changeStage, forumsList }) => {
  return (
    <List
      className={cls.list}
      header={
        <div className={cls.header}>
          <Typography.Text className={cls.headerTitle}>Themes</Typography.Text>
          <Typography.Text className={cls.headerTitle}>Answers</Typography.Text>
        </div>
      }
      dataSource={forumsList}
      renderItem={(forum) => (
        <List.Item
          onClick={() => {
            changeStage(ForumPageStages.forumTopicsList);
          }}
          className={cls.listItem}
        >
          <Typography.Text className={cls.title}>{forum.name}</Typography.Text>
          <div className={cls.listContent}>
            <div className={cls.badgeWrapper}>
              <Badge
                count={forum.themes}
                showZero
                overflowCount={99}
                className={cls.badge}
                color="#F0F0F0"
              />
            </div>
            <div className={cls.badgeWrapper}>
              <Badge
                count={forum.answers}
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
