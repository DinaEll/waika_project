import { redirect } from 'react-router-dom';
import { ForumPage } from '@/pages/ForumPage';
import { ForumTopicPage } from '@/pages/ForumTopicPage';
import { GamePage } from '@/pages/GamePage';
import { LeaderboardPage } from '@/pages/LeaderboardPage';
import { LoginPage } from '@/pages/LoginPage';
import { MainPage } from '@/pages/MainPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { initProfilePage } from '@/pages/ProfilePage/ui/ProfilePage';
import { RegistrationPage } from '@/pages/RegistrationPage';
import { ServerErrorPage } from '@/pages/ServerErrorPage';
import { getPageUrl } from '@/shared/config';
import { withAuth } from '@/shared/hocs';
import { AppDispatch, RootState } from '@/shared/store/store';
import { Layout } from '@/widgets/Layout';

const ProtectedLayout = withAuth(Layout);

export type InitPage = (args: PageInitArgs) => Promise<void>;
export interface PageInitContext {
  clientToken?: string;
}

export interface PageInitArgs {
  dispatch: AppDispatch;
  state: RootState;
  // ctx: PageInitContext
}

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
        fetchData: initProfilePage,
      },
      {
        path: getPageUrl('registration'),
        Component: RegistrationPage,
        fetchData: initProfilePage,
      },
      {
        path: getPageUrl('game'),
        Component: GamePage,
        fetchData: initProfilePage,
      },
      {
        path: getPageUrl('forum'),
        Component: ForumPage,
        fetchData: initProfilePage,
      },
      {
        path: getPageUrl('forum-topic', { topicId: ':topicId' }),
        Component: ForumTopicPage,
        fetchData: initProfilePage,
      },
      {
        path: getPageUrl('leaderboard'),
        Component: LeaderboardPage,
        fetchData: initProfilePage,
      },
      {
        path: getPageUrl('profile'),
        Component: ProfilePage,
        fetchData: initProfilePage,
      },
      {
        path: getPageUrl('not-found'),
        Component: NotFoundPage,
        fetchData: initProfilePage,
      },
      {
        path: getPageUrl('server-error'),
        Component: ServerErrorPage,
        fetchData: initProfilePage,
      },
    ],
  },
];
