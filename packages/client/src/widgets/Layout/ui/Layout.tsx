import { Suspense } from 'react'
import cls from './Layout.module.scss'
import classNames from 'classnames'
import { NavLink, Outlet } from 'react-router-dom'
import { getPageUrl } from '@/shared/config/router/routerConfig'

export const Layout = () => {
  return (
    <div className={cls.layout}>
      <nav className={classNames(cls.navbar)}>
        <NavLink to={getPageUrl('main')}>Main</NavLink>
        <NavLink to={getPageUrl('registration')}>Registration</NavLink>
        <NavLink to={getPageUrl('login')}>Login</NavLink>
        <NavLink to={getPageUrl('forum')}>Forum</NavLink>
        <NavLink to={getPageUrl('forum-topic', { topicId: 'some-topic-name' })}>
          Forum topic
        </NavLink>
        <NavLink to={getPageUrl('profile')}>Profile</NavLink>
      </nav>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}
