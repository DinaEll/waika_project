import { type FC } from 'react'
import { Typography } from 'antd'
import { UserAvatar } from '@/shared/ui'
import { players } from '../../model'
import styles from './LeaderboardPlayer.module.scss'

type Props = typeof players[number]

export const LeaderboardPlayer: FC<Props> = ({
  avatar,
  name,
  points,
  positon,
}) => {
  return (
    <tr className={styles.player}>
      <td className={styles.positon}>
        <Typography.Text>{positon}</Typography.Text>
      </td>
      <td className={styles.avatar}>
        <UserAvatar src={avatar} />
      </td>
      <td>
        <Typography.Title level={5} className={styles.name}>
          {name}
        </Typography.Title>
      </td>
      <td className={styles.points}>
        <Typography.Text>{points}</Typography.Text>
      </td>
    </tr>
  )
}
