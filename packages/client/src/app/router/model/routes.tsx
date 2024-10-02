import { redirect } from 'react-router-dom';
import { ForumPage } from '@/pages/ForumPage';
import { ForumTopicPage } from '@/pages/ForumTopicPage';
import { GamePage } from '@/pages/GamePage';
import { LeaderboardPage } from '@/pages/LeaderboardPage';
import { LoginPage } from '@/pages/LoginPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { RegistrationPage } from '@/pages/RegistrationPage';
import { ServerErrorPage } from '@/pages/ServerErrorPage';
import { getPageUrl } from '@/shared/config';
import { withAuth } from '@/shared/hocs';
import { Layout } from '@/widgets/Layout';

const ProtectedLayout = withAuth(Layout);

export const routes = [
  {
    path: '/',
    Component: MainPage,

    // TODO не работает редирект  https://reactrouter.com/en/main/routers/create-static-handler#createstatichandler
    // loader: () => redirect('/login'),
    children: [
      {
        index: true,
        loader: () => redirect('/login'),
      },
    ],
  },
  {
    Component: ProtectedLayout,
    children: [
      {
        path: getPageUrl('login'),
        Component: LoginPage,
      },
      {
        path: getPageUrl('registration'),
        Component: RegistrationPage,
      },
      {
        path: getPageUrl('game'),
        Component: GamePage,
      },
      {
        path: getPageUrl('forum'),
        Component: ForumPage,
      },
      {
        path: getPageUrl('forum-topic', { topicId: ':topicId' }),
        Component: ForumTopicPage,
      },
      {
        path: getPageUrl('leaderboard'),
        Component: LeaderboardPage,
      },
      {
        path: getPageUrl('profile'),
        Component: ProfilePage,
      },
      {
        path: getPageUrl('not-found'),
        Component: NotFoundPage,
      },
      {
        path: getPageUrl('server-error'),
        Component: ServerErrorPage,
      },
    ],
  },
];
