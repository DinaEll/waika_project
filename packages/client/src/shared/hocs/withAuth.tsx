import { ComponentType, FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPageUrl, pagesPaths } from '@/shared/config';
import { useAppSelector } from '@/shared/store/hooks';

export function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  const WithAuth: FC<P> = (props) => {
    const navigate = useNavigate();
    const user = useAppSelector((state) => state.user.data);

    useEffect(() => {
      if (!user) {
        navigate(getPageUrl('login'));
        return;
      }

      const nonProtectedRoute = (
        [pagesPaths.login, pagesPaths.registration] as string[]
      ).includes(location.pathname);

      if (nonProtectedRoute && user) {
        navigate(getPageUrl('game'));
      }
    }, [navigate, user]);

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent {...props} />;
  };

  return WithAuth;
}
