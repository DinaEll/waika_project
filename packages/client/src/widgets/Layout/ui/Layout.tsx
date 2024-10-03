import { Outlet } from 'react-router-dom';
import { useAppSelector } from '@/shared/store/hooks';
import { ErrorBoundary } from '@/widgets/ErrorBoundary/ErrorBoundary';
import { Header } from '@/widgets/Header';
import cls from './Layout.module.scss';

export const Layout = () => {
  const user = useAppSelector((state) => state.user.data);

  return (
    <div className={cls.layout}>
      {user && <Header />}

      <ErrorBoundary>
        <main className={cls.content}>
          <Outlet />
        </main>
      </ErrorBoundary>
    </div>
  );
};
