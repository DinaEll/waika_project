import { Empty, Typography } from 'antd';
import { UserAvatar } from '@/shared/ui';
import { MainContainer } from '@/widgets/MainContainer';
import { players } from '../model';
import cls from './LeaderboardPage.module.scss';
import { LeaderboardPlayer } from './LeaderboardPlayer';

const pageTitle = 'Leaderboard';

export const LeaderboardPage = () => {
  if (players.length === 0) {
    return (
      <MainContainer title={pageTitle}>
        <Empty />
      </MainContainer>
    );
  }

  const leader = players[0];

  if (!leader) {
    return <MainContainer title={'Leader Not Found'} />;
  }

  return (
    <MainContainer
      title={
        <div className={cls.leaderInfo}>
          <Typography.Title level={4} className={cls.noMargin}>
            {leader.name}
          </Typography.Title>
          <Typography.Title level={5} className={cls.noMargin}>
            {leader.points}
          </Typography.Title>
        </div>
      }
      logo={
        <div className={cls.leaderAvatar}>
          <UserAvatar src={leader.avatar} />
        </div>
      }
    >
      <table className={cls.players}>
        <tbody>
          {players.map(({ avatar, name, points, positon }) => {
            return (
              <LeaderboardPlayer
                key={name}
                avatar={avatar}
                name={name}
                points={points}
                positon={positon}
              />
            );
          })}
        </tbody>
      </table>
    </MainContainer>
  );
};
