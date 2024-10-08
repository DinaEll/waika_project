import { RouteObject } from 'react-router-dom';
import {
  ForumTopicPage,
  GamePage,
  LeaderboardPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  ProfilePage,
  RegistrationPage,
  ServerErrorPage,
  ForumPage,
} from '@/pages';
import { getPageUrl } from '@/shared/config';
import { withAuth, withOauth } from '@/shared/hocs';
import { initPageBase } from '@/shared/utils';
import { Layout } from '@/widgets';

const ProtectedLayout = withAuth(Layout);
const MainPageWithOauth = withOauth(withAuth(MainPage));

type RouteObjectWithFetch = RouteObject & {
  fetchData?: typeof initPageBase;
  children?: RouteObjectWithFetch[];
};

export const routes: RouteObjectWithFetch[] = [
  {
    Component: Layout,
    children: [
      {
        path: '/',
        Component: MainPageWithOauth,
        fetchData: initPageBase,
      },
      {
        path: getPageUrl('login'),
        Component: LoginPage,
        fetchData: initPageBase,
      },
      {
        path: getPageUrl('registration'),
        Component: RegistrationPage,
        fetchData: initPageBase,
      },
      {
        path: getPageUrl('not-found'),
        Component: NotFoundPage,
        fetchData: initPageBase,
      },
      {
        path: getPageUrl('server-error'),
        Component: ServerErrorPage,
        fetchData: initPageBase,
      },
    ],
  },

  {
    Component: ProtectedLayout,
    children: [
      {
        path: getPageUrl('game'),
        Component: GamePage,
        fetchData: initPageBase,
      },
      {
        path: getPageUrl('forum'),
        Component: ForumPage,
        fetchData: initPageBase,
      },
      {
        path: getPageUrl('forum-topic', { topicId: ':topicId' }),
        Component: ForumTopicPage,
        fetchData: initPageBase,
      },
      {
        path: getPageUrl('leaderboard'),
        Component: LeaderboardPage,
        fetchData: initPageBase,
      },
      {
        path: getPageUrl('profile'),
        Component: ProfilePage,
        fetchData: initPageBase,
      },
    ],
  },
];
