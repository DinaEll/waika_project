import cls from './Header.module.scss'
import { Button } from 'antd'
import { getPageUrl } from '@/shared/config'
import { NavLink, useNavigate } from 'react-router-dom'
import { LeftOutlined, PoweroffOutlined } from '@ant-design/icons'

export const Header = () => {
  const navigate = useNavigate()

  const handleLogout = () => {
    const baseUrl = 'https://ya-praktikum.tech/api/v2'

    fetch(baseUrl + '/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    })
      .then(res => {
        if (res.status === 200) {
          navigate(getPageUrl('login'))
        }
      })
      .catch(error => console.error(error))
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
