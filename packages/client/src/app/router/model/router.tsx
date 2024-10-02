import { createBrowserRouter } from 'react-router-dom';
import { routes } from './routes';

// const ProtectedLayout = withAuth(Layout);
// export const routes = [
//   {
//     path: '/',
//     element: <MainPage />,
//     children: [
//       {
//         index: true,
//         loader: () => redirect('/login'),
//       },
//     ],
//   },
//   {
//     element: <ProtectedLayout />,
//     children: [
//       {
//         path: getPageUrl('login'),
//         element: <LoginPage />,
//       },
//       {
//         path: getPageUrl('registration'),
//         element: <RegistrationPage />,
//       },
//       {
//         path: getPageUrl('game'),
//         element: <GamePage />,
//       },
//       {
//         path: getPageUrl('forum'),
//         element: <ForumPage />,
//       },
//       {
//         path: getPageUrl('forum-topic', { topicId: ':topicId' }),
//         element: <ForumTopicPage />,
//       },
//       {
//         path: getPageUrl('leaderboard'),
//         element: <LeaderboardPage />,
//       },
//       {
//         path: getPageUrl('profile'),
//         element: <ProfilePage />,
//       },
//       {
//         path: getPageUrl('not-found'),
//         element: <NotFoundPage />,
//       },
//       {
//         path: getPageUrl('server-error'),
//         element: <ServerErrorPage />,
//       },
//     ],
//   },
// ]

export const router = createBrowserRouter(routes);
