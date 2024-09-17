import { unwrapResult } from '@reduxjs/toolkit';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
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
      <Header />

      <ErrorBoundary>
        <main className={cls.content}>
          <Outlet />
        </main>
      </ErrorBoundary>
    </div>
  );
};
