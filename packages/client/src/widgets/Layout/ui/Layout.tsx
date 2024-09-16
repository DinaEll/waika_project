import { unwrapResult } from '@reduxjs/toolkit';
import classNames from 'classnames';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { getPageUrl, pagesPaths } from '@/shared/config';
import { useEffectOnce } from '@/shared/hooks';
import { useAppDispatch } from '@/shared/store/hooks';
import { fetchUser } from '@/shared/store/user/user.action';
import { ErrorBoundary } from '@/widgets/ErrorBoundary/ErrorBoundary';
import { Header } from '@/widgets/Header';
import cls from './Layout.module.scss';

export const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  useEffectOnce(() => {
    dispatch(fetchUser())
      .then(unwrapResult)
      .then((res) => {
        if (!res.id) {
          navigate(getPageUrl('login'));
          return;
        }

        const nonProtectedRoute = (
          [pagesPaths.login, pagesPaths.registration] as string[]
        ).includes(location.pathname);
        if (nonProtectedRoute) {
          navigate(getPageUrl('main'));
        }
      })
      .catch(console.error);
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

      <Header />

      <ErrorBoundary>
        <main>
          <Outlet />
        </main>
      </ErrorBoundary>
    </div>
  );
};
