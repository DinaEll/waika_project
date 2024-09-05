import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { getPageUrl, pagesPaths } from '@/shared/config'
import cls from './Layout.module.scss'
import { Header } from '@/widgets/Header'
import { useEffect } from 'react'
import { getUser } from '@/shared/api'

export const Layout = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    getUser().then(res => {
      if (!res?.id) {
        navigate(getPageUrl('login'))
        return
      }

      const nonProtectedRoute = (
        [pagesPaths.login, pagesPaths.registration] as string[]
      ).includes(location.pathname)
      if (nonProtectedRoute) {
        navigate(getPageUrl('main'))
      }
    })
  }, [])

  return (
    <div className={cls.layout}>
      <nav className={classNames(cls.navbar)}>
        <NavLink to={getPageUrl('main')}>Main</NavLink>
        <NavLink to={getPageUrl('registration')}>Registration</NavLink>
        <NavLink to={getPageUrl('login')}>Login</NavLink>
        <NavLink to={getPageUrl('forum')}>Forum</NavLink>
        <NavLink to={getPageUrl('game')}>Game</NavLink>
        <NavLink to={getPageUrl('game-results')}>Game results</NavLink>
        <NavLink to={getPageUrl('game-startup')}>Game startup</NavLink>
        <NavLink to={getPageUrl('leaderboard')}>Leaderboard</NavLink>
        <NavLink to={getPageUrl('not-found')}>Not Found Page</NavLink>
        <NavLink to={getPageUrl('server-error')}>Server Error Page</NavLink>
        <NavLink to={getPageUrl('profile')}>Profile</NavLink>
      </nav>

      <Header></Header>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
