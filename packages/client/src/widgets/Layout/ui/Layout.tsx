import { Outlet } from 'react-router-dom';
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
      {user && <Header />}

      <ErrorBoundary>
        <main className={cls.content}>
          <Outlet />
        </main>
      </ErrorBoundary>
    </div>
  );
};
