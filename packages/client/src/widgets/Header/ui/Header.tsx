import cls from './Header.module.scss'
import { Button } from 'antd'
import { getPageUrl } from '@/shared/config'
import { NavLink, useNavigate } from 'react-router-dom'
import { LeftOutlined, PoweroffOutlined } from '@ant-design/icons'
import { logOut } from '@/shared/api'

export const Header = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    logOut().then(() => navigate(getPageUrl('login')))
  }

  return (
    <div className={cls.headerWrapper}>
      <div className={cls.headerBlock}>
        <Button
          type="text"
          icon={<LeftOutlined />}
          iconPosition="start"
          onClick={() => navigate(-1)}>
          Back
        </Button>
      </div>
      <div className={cls.headerBlock}>
        <NavLink to={getPageUrl('leaderboard')}>
          <Button type="link">Leaderboard</Button>
        </NavLink>
        <NavLink to={getPageUrl('game-startup')}>
          <Button type="primary">Play</Button>
        </NavLink>
        <NavLink to={getPageUrl('forum')}>
          <Button type="link">Forum</Button>
        </NavLink>
      </div>
      <div className={cls.headerBlock}>
        <NavLink to={getPageUrl('profile')}>
          <Button type="link">Profile</Button>
        </NavLink>
        <Button
          type="text"
          icon={<PoweroffOutlined />}
          onClick={handleLogout}></Button>
      </div>
    </div>
  )
}
