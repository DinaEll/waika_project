import { Empty, Typography } from 'antd'
import { LogoWithModal } from '@/widgets'
import { UserAvatar } from '@/shared/ui'
import { players } from '../model'
import { LeaderboardPlayer } from './LeaderboardPlayer'
import cls from './LeaderboardPage.module.scss'

const pageTitle = 'Leaderboard'

export const LeaderboardPage = () => {
  if (players.length === 0) {
    return (
      <LogoWithModal title={pageTitle}>
        <Empty />
      </LogoWithModal>
    )
  }

  const { avatar, name, points } = players[0]

  return (
    <LogoWithModal
      title={
        <div className={cls.leaderInfo}>
          <Typography.Title level={4} className={cls.noMargin}>
            {name}
          </Typography.Title>
          <Typography.Title level={5} className={cls.noMargin}>
            {points}
          </Typography.Title>
        </div>
      }
      logo={
        <div className={cls.leaderAvatar}>
          <UserAvatar src={avatar} />
        </div>
      }>
      <table className={cls.players}>
        {players.map(player => {
          return <LeaderboardPlayer {...player} />
        })}
      </table>
    </LogoWithModal>
  )
}
