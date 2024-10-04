import classNames from 'classnames';
import { type FC } from 'react';
import { Outlet } from 'react-router-dom';
import { useAppSelector } from '@/shared/store/hooks';
import { isUserAuthSelector } from '@/shared/store/user/user.selector';
import { ErrorBoundary, Header } from '@/widgets';
import cls from './Layout.module.scss';

export const Layout: FC = () => {
  const isUserAuth = useAppSelector(isUserAuthSelector);

  return (
    <div className={classNames(cls.layout, isUserAuth && cls.layoutAuth)}>
      {isUserAuth ? <Header /> : null}

      <ErrorBoundary>
        <main className={cls.content}>
          <Outlet />
        </main>
      </ErrorBoundary>
    </div>
  );
};
