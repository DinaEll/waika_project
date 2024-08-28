//TODO Lvl up https://feature-sliced.design/ru/docs/get-started/tutorial#%D0%BF%D0%B5%D1%80%D0%B5%D0%B8%D1%81%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D0%BD%D0%B8%D0%B5-%D0%BE%D0%B1%D1%89%D0%B5%D0%B3%D0%BE-%D0%BA%D0%BE%D0%B4%D0%B0

const pagesPaths = {
  main: '/',
  login: '/login',
  registration: '/registration',
  profile: '/profile',
  game: '/game',
  'game-startup': '/game/startup',
  'game-results': '/game/results',
  leaderboard: '/leaderboard',
  forum: '/forum',
  'forum-topic': '/forum/:topicId',
  'not-found': '*',
} as const

type PageName = keyof typeof pagesPaths

type ReplaceParams<T extends string> =
  T extends `${infer Start}:${string}/${infer Rest}`
    ? `${Start}${string}/${ReplaceParams<Rest>}`
    : T extends `${infer Start}:${string}`
    ? `${Start}${string}`
    : T

export function getPageUrl<T extends PageName>(
  page: T,
  params?: T extends 'forum-topic' ? { topicId: string | number } : never
): ReplaceParams<typeof pagesPaths[T]> {
  let path = pagesPaths[page] as string
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      path = path.replace(`:${key}`, String(value))
    })
  }
  return path as ReplaceParams<typeof pagesPaths[T]>
}
