export const pagesPaths = {
  main: '/',
  login: '/login',
  registration: '/registration',
  profile: '/profile',
  game: '/game',
  leaderboard: '/leaderboard',
  forum: '/forum',
  'forum-topic': '/forum/:topicId',
  'not-found': '*',
  'server-error': '/server-error',
} as const;

type PageName = keyof typeof pagesPaths;

type ReplaceParams<T extends string> =
  T extends `${infer Start}:${string}/${infer Rest}`
    ? `${Start}${string}/${ReplaceParams<Rest>}`
    : T extends `${infer Start}:${string}`
      ? `${Start}${string}`
      : T;

export function getPageUrl<T extends PageName>(
  page: T,
  params?: T extends 'forum-topic' ? { topicId: string | number } : never,
): ReplaceParams<(typeof pagesPaths)[T]> {
  let path = pagesPaths[page] as string;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, String(value));
    });
  }
  return path as ReplaceParams<(typeof pagesPaths)[T]>;
}
