import { RouterProvider } from 'react-router-dom';
import { router } from '../model/router';

export const BrowserRouterProvider: React.FC<{
  children: React.ReactNode;
}> = () => {
  return <RouterProvider router={router} />;
};
