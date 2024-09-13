import classNames from 'classnames';
import { Outlet, NavLink } from 'react-router-dom';
import { getPageUrl } from '@/shared/config';
import { useEffectOnce } from '@/shared/hooks';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { fetchUser } from '@/shared/store/user/user.action';
import { ErrorBoundary } from '@/widgets/ErrorBoundary/ErrorBoundary';
import { Header } from '@/widgets/Header';
import cls from './Layout.module.scss';

export const Layout = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.data);

  useEffectOnce(() => {
    dispatch(fetchUser()).catch(console.error);
  });

  return (
    <div className={cls.layout}>
      <nav className={classNames(cls.navbar)}>
        <NavLink to={getPageUrl('main')}>Main</NavLink>
        <NavLink to={getPageUrl('registration')}>Registration</NavLink>
        <NavLink to={getPageUrl('login')}>Login</NavLink>
        <NavLink to={getPageUrl('forum')}>Forum</NavLink>
        <NavLink to={getPageUrl('game')}>Game</NavLink>
        <NavLink to={getPageUrl('leaderboard')}>Leaderboard</NavLink>
        <NavLink to={getPageUrl('not-found')}>Not Found Page</NavLink>
        <NavLink to={getPageUrl('server-error')}>Server Error Page</NavLink>
        <NavLink to={getPageUrl('profile')}>Profile</NavLink>
      </nav>

      {user && <Header />}

      <ErrorBoundary>
        <main>
          <Outlet />
        </main>
      </ErrorBoundary>
    </div>
  );
};
