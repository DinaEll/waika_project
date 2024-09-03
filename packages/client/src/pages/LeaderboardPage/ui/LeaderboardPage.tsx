import { Empty, Typography } from 'antd';
import { UserAvatar } from '@/shared/ui';
import { LogoWithModal } from '@/widgets';
import { players } from '../model';
import cls from './LeaderboardPage.module.scss';
import { LeaderboardPlayer } from './LeaderboardPlayer';

const pageTitle = 'Leaderboard';

export const LeaderboardPage = () => {
  if (players.length === 0) {
    return (
      <LogoWithModal title={pageTitle}>
        <Empty />
      </LogoWithModal>
    );
  }

  const leader = players[0];

  if (!leader) {
    return <LogoWithModal title={'Leader Not Found'} />;
  }

  return (
    <LogoWithModal
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
        {players.map((player) => {
          return <LeaderboardPlayer key={player.name} {...player} />;
        })}
      </table>
    </LogoWithModal>
  );
};
