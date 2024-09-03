import { Outlet, NavLink } from 'react-router-dom';
import classNames from 'classnames';
import { getPageUrl } from '@/shared/config';
import cls from './Layout.module.scss';
import { Header } from '@/widgets/Header';

export const Layout = () => {
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
  );
};
