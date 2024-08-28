import { type FC } from 'react'
import { Typography } from 'antd'
import { UserAvatar } from '@/shared/ui'
import { players } from '../../model'
import cls from './LeaderboardPlayer.module.scss'

type Props = typeof players[number]

export const LeaderboardPlayer: FC<Props> = ({
  avatar,
  name,
  points,
  positon,
}) => {
  return (
    <tr className={cls.player}>
      <td className={cls.positon}>
        <Typography.Text>{positon}</Typography.Text>
      </td>
      <td className={cls.avatar}>
        <UserAvatar src={avatar} />
      </td>
      <td>
        <Typography.Title level={5} className={cls.name}>
          {name}
        </Typography.Title>
      </td>
      <td className={cls.points}>
        <Typography.Text>{points}</Typography.Text>
      </td>
    </tr>
  )
}
