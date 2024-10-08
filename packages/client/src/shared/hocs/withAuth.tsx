import { unwrapResult } from '@reduxjs/toolkit';
import { useState, type ComponentType, type FC } from 'react';
import { Navigate } from 'react-router-dom';
import { getPageUrl } from '@/shared/config';
import { useEffectOnce } from '@/shared/hooks';
import { useAppDispatch, useAppSelector } from '@/shared/store/hooks';
import { fetchUser } from '@/shared/store/user/user.action';
import { logError } from '@/shared/utils';
import { CenteredOfPage, Loading } from '@/widgets';
import { isUserAuthSelector } from '../store/user/user.selector';

export const withAuth = <P extends Record<string, string>>(
  Component: ComponentType<P>,
): FC<P> => {
  const WrappedComponent: FC<P> = (props) => {
    const dispatch = useAppDispatch();
    const isUserAuth = useAppSelector(isUserAuthSelector);
    const [isLoading, setIsLoading] = useState(true);

    useEffectOnce(() => {
      const controller = new AbortController();
      dispatch(fetchUser({ signal: controller.signal }))
        .then(unwrapResult)
        .then(() => {
          setIsLoading(false);
        })
        .catch((error) => {
          if (controller.signal.aborted) {
            return;
          }

          setIsLoading(false);
          logError(error);
        });

      return () => {
        controller.abort();
      };
    });

    if (isLoading) {
      return (
        <CenteredOfPage>
          <Loading />
        </CenteredOfPage>
      );
    }

    if (isUserAuth) {
      // eslint-disable-next-line react/jsx-props-no-spreading
      return <Component {...props} />;
    }

    return <Navigate to={getPageUrl('login')} replace />;
  };

  return WrappedComponent;
};
