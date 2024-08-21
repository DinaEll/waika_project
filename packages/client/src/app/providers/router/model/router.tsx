import { MainPage } from '@/pages/MainPage'
import { createBrowserRouter } from 'react-router-dom'
import { pagesNames, pagesPaths } from '@/shared/config/router/routerConfig'
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
    path: pagesPaths[pagesNames.MAIN],
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: pagesPaths[pagesNames.FORUM],
        element: <ForumPage />,
      },
      {
        path: pagesPaths[pagesNames.FORUM_TOPIC] + ':topicId',
        element: <ForumTopicPage />,
      },
      {
        path: pagesPaths[pagesNames.GAME],
        element: <GamePage />,
      },
      {
        path: pagesPaths[pagesNames.GAME_RESULTS],
        element: <GameResultsPage />,
      },
      {
        path: pagesPaths[pagesNames.GAME_STARTUP],
        element: <GameStartupPage />,
      },
      {
        path: pagesPaths[pagesNames.LEADERBOARD],
        element: <LeaderboardPage />,
      },
      {
        path: pagesPaths[pagesNames.LOGIN],
        element: <LoginPage />,
      },
      {
        path: pagesPaths[pagesNames.PROFILE],
        element: <ProfilePage />,
      },
      {
        path: pagesPaths[pagesNames.REGISTRATION],
        element: <RegistrationPage />,
      },
      {
        path: pagesPaths[pagesNames.NOT_FOUND],
        element: <NotFoundPage />,
      },
    ],
  },
])
