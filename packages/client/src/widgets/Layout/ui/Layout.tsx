import { Outlet, NavLink } from 'react-router-dom'
import { Suspense } from 'react'
import cls from './Layout.module.scss'
import classNames from 'classnames'
import { pagesNames, pagesPaths } from '@/shared/config/router/routerConfig'

export const Layout = () => {
  return (
    <div>
      {/* nav не нужен, это для тестов */}
      <nav className={classNames(cls.navbar)}>
        <NavLink to={pagesPaths[pagesNames.MAIN]}>Main</NavLink>
        <NavLink to={pagesPaths[pagesNames.FORUM]}>Forum</NavLink>
        <NavLink to={pagesPaths[pagesNames.FORUM_TOPIC] + 'some-topic-name'}>
          Forum topic
        </NavLink>
      </nav>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}
