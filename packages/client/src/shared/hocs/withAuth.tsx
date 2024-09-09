import { ComponentType, FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPageUrl } from '@/shared/config';

export function withAuth<P extends object>(WrappedComponent: ComponentType<P>) {
  const WithAuth: FC<P> = (props) => {
    const navigate = useNavigate();
    //TODO add redux user state to auth value, it is hardcoded as false only for testing purposes
    const auth = false;

    useEffect(() => {
      if (!auth) {
        navigate(getPageUrl('login'));
      }
    }, [navigate, auth]);

    if (!auth) {
      return null;
    }

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent {...props} />;
  };

  return WithAuth;
}
