import classNames from 'classnames';
import { Outlet, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { getUser } from '@/shared/api';
import { getPageUrl, pagesPaths } from '@/shared/config';
import { useEffectOnce } from '@/shared/hooks';
import { Header } from '@/widgets/Header';
import cls from './Layout.module.scss';

export const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffectOnce(() => {
    void getUser().then((res) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      if (!res?.id) {
        navigate(getPageUrl('login'));
        return;
      }

      const nonProtectedRoute = (
        [pagesPaths.login, pagesPaths.registration] as string[]
      ).includes(location.pathname);
      if (nonProtectedRoute) {
        navigate(getPageUrl('main'));
      }
    });
  });

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

      <Header />

      <main>
        <Outlet />
      </main>
    </div>
  );
};
