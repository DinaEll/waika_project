import { type FC } from 'react';
import { Navigate } from 'react-router-dom';
import { getPageUrl } from '@/shared/config';
import { useAppSelector } from '@/shared/store/hooks';
import { isUserAuthSelector } from '@/shared/store/user/user.selector';

export const MainPage: FC = () => {
  const isUserAuth = useAppSelector(isUserAuthSelector);

  if (isUserAuth) {
    return <Navigate to={getPageUrl('game')} replace />;
  }

  return <Navigate to={getPageUrl('login')} replace />;
};
