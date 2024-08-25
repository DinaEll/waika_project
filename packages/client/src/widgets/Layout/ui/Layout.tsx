import { Outlet, NavLink } from 'react-router-dom'
import { Suspense } from 'react'
import { getPageUrl } from '@/shared/config/router/routerConfig'

export const Layout = () => {
  return (
    <div>
      {/* nav не нужен, это для тестов */}
      <nav>
        <NavLink to={getPageUrl('main')}>Main</NavLink>
        <NavLink to={getPageUrl('registration')}>Registration</NavLink>
        <NavLink to={getPageUrl('forum')}>Forum</NavLink>
        <NavLink to={getPageUrl('forum-topic', { topicId: 'some-topic-name' })}>
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
