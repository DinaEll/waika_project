import { ComponentType, createElement } from 'react';
import { RouteObject } from 'react-router-dom';
import { withAuth } from '@/shared/hocs';

type ProtectedComponent<P = object> = ComponentType<P>;

export function createProtectedRoute<P extends object>(
  element: ProtectedComponent<P>,
  path: string,
): RouteObject {
  return {
    path,
    element: createElement(withAuth(element)),
  };
}
