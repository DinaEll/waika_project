import { Outlet, NavLink } from 'react-router-dom'
import classNames from 'classnames'
import { getPageUrl } from '@/shared/config'
import cls from './Layout.module.scss'

export const Layout = () => {
  return (
    <div>
      <nav className={classNames(cls.navbar)}>
        <NavLink to={getPageUrl('main')}>Main</NavLink>
        <NavLink to={getPageUrl('registration')}>Registration</NavLink>
        <NavLink to={getPageUrl('login')}>Login</NavLink>
        <NavLink to={getPageUrl('forum')}>Forum</NavLink>
        <NavLink to={getPageUrl('game-results')}>Game results</NavLink>
        <NavLink to={getPageUrl('leaderboard')}>Leaderboard</NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
