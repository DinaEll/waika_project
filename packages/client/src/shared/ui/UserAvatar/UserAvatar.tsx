import { type ComponentProps, type FC } from 'react'
import { Avatar } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import styles from './UserAvatar.module.scss'

type Props = Pick<ComponentProps<typeof Avatar>, 'src'>

export const UserAvatar: FC<Props> = ({ src }) => {
  return (
    <Avatar className={styles.fullWidth} icon={<UserOutlined />} src={src} />
  )
}
