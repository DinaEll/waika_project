import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom'
import classNames from 'classnames'
import { getPageUrl, pagesPaths, appConfig } from '@/shared/config'
import cls from './Layout.module.scss'
import { useEffect } from 'react'

export const Layout = () => {
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    fetch(appConfig.baseUrl + '/auth/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      credentials: 'include',
    })
      .then(res => res.json())
      .then(res => {
        if (!res.id) {
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
      .catch(error => console.error(error))
  }, [])

  return (
    <div>
      <nav className={classNames(cls.navbar)}>
        <NavLink to={getPageUrl('main')}>Main</NavLink>
        <NavLink to={getPageUrl('registration')}>Registration</NavLink>
        <NavLink to={getPageUrl('login')}>Login</NavLink>
        <NavLink to={getPageUrl('forum')}>Forum</NavLink>
        <NavLink to={getPageUrl('game-results')}>Game results</NavLink>
        <NavLink to={getPageUrl('leaderboard')}>Leaderboard</NavLink>
        <NavLink to={getPageUrl('not-found')}>Not Found Page</NavLink>
        <NavLink to={getPageUrl('server-error')}>Server Error Page</NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </div>
  )
}
