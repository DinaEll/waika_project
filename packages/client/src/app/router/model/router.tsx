import { createBrowserRouter, redirect } from 'react-router-dom';
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

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
    children: [
      {
        index: true,
        loader: () => redirect('/login'),
      },
    ],
  },
  {
    element: <ProtectedLayout />,
    children: [
      {
        path: getPageUrl('login'),
        element: <LoginPage />,
      },
      {
        path: getPageUrl('registration'),
        element: <RegistrationPage />,
      },
      {
        path: getPageUrl('game'),
        element: <GamePage />,
      },
      {
        path: getPageUrl('forum'),
        element: <ForumPage />,
      },
      {
        path: getPageUrl('forum-topic', { topicId: ':topicId' }),
        element: <ForumTopicPage />,
      },
      {
        path: getPageUrl('leaderboard'),
        element: <LeaderboardPage />,
      },
      {
        path: getPageUrl('profile'),
        element: <ProfilePage />,
      },
      {
        path: getPageUrl('not-found'),
        element: <NotFoundPage />,
      },
      {
        path: getPageUrl('server-error'),
        element: <ServerErrorPage />,
      },
    ],
  },
]);
