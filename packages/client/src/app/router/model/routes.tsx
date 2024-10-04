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
import { initPageBase } from '@/utils/initPageFunctions/initPageBase';
import { Layout } from '@/widgets/Layout';

export const routes = [
  {
    path: '/',
    Component: MainPage,
    children: [
      {
        index: true,
        loader: () => redirect('/login'),
      },
    ],
  },
  {
    Component: Layout,
    children: [
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
];
