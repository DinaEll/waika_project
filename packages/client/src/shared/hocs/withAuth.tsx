import { ComponentType, FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPageUrl, pagesPaths } from '@/shared/config';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { fetchUser } from '../store/user/user.action';

export function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  const WithAuth: FC<P> = (props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const user = useAppSelector((state) => state.user.data);

    useEffect(() => {
      if (!user) {
        dispatch(fetchUser('')).catch(console.error);
        return;
      }

      const nonProtectedRoute = (
        [pagesPaths.login, pagesPaths.registration] as string[]
      ).includes(location.pathname);

      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (nonProtectedRoute && user) {
        navigate(getPageUrl('game'));
      }
    }, [navigate, user, dispatch]);

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent {...props} />;
  };

  return WithAuth;
}
