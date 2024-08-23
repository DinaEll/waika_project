import { MainPage } from '@/pages/MainPage'
import { createBrowserRouter } from 'react-router-dom'
import { getPageUrl } from '@/shared/config/router/routerConfig'
import { Layout } from '@/widgets/Layout'
import { ForumPage } from '@/pages/ForumPage'
import { ForumTopicPage } from '@/pages/ForumTopicPage'
import { GamePage } from '@/pages/GamePage'
import { GameResultsPage } from '@/pages/GameResultsPage'
import { GameStartupPage } from '@/pages/GameStartupPage'
import { LeaderboardPage } from '@/pages/LeaderboardPage'
import { LoginPage } from '@/pages/LoginPage'
import { ProfilePage } from '@/pages/ProfilePage'
import { RegistrationPage } from '@/pages/RegistrationPage'
import { NotFoundPage } from '@/pages/NotFoundPage'

export const router = createBrowserRouter([
  {
    path: getPageUrl('main'),
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
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
        path: getPageUrl('game'),
        element: <GamePage />,
      },
      {
        path: getPageUrl('game-results'),
        element: <GameResultsPage />,
      },
      {
        path: getPageUrl('game-startup'),
        element: <GameStartupPage />,
      },
      {
        path: getPageUrl('leaderboard'),
        element: <LeaderboardPage />,
      },
      {
        path: getPageUrl('login'),
        element: <LoginPage />,
      },
      {
        path: getPageUrl('profile'),
        element: <ProfilePage />,
      },
      {
        path: getPageUrl('registration'),
        element: <RegistrationPage />,
      },
      {
        path: getPageUrl('not-found'),
        element: <NotFoundPage />,
      },
    ],
  },
])
