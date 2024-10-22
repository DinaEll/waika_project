import { unwrapResult } from '@reduxjs/toolkit';
import { useState, type ComponentType, type FC } from 'react';
import { useSearchParams } from 'react-router-dom';
import { signInOauthYandex } from '@/shared/api';
import { getOauthRedirectUrl } from '@/shared/config';
import { useEffectOnce } from '@/shared/hooks';
import { isDefined, logError, showMessage } from '@/shared/utils';
import { CenteredOfPage, Loading } from '@/widgets';
import { useAppDispatch } from '../store/hooks';
import { fetchUser } from '../store/user/user.action';

export const withOauth = <P extends Record<string, string>>(
  Component: ComponentType<P>,
): FC<P> => {
  const WrappedComponent: FC<P> = (props) => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();

    const code = searchParams.get('code');
    const [isLoading, setIsLoading] = useState(() => isDefined(code));

    useEffectOnce(() => {
      if (!isDefined(code)) {
        return;
      }

      const controller = new AbortController();
      const redirectUrl = getOauthRedirectUrl();

      signInOauthYandex(
        {
          code,
          redirect_uri: redirectUrl,
        },
        controller.signal,
      )
        .then((data) => {
          if (isDefined(data)) {
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
          } else {
            setIsLoading(false);
            showMessage({
              title: 'An error occurred',
              content: 'Server is unavailable, try again later...',
            });
          }
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

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <Component {...props} />;
  };

  return WrappedComponent;
};
