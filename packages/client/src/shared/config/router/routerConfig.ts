export enum pagesNames {
  MAIN = 'main',
  LOGIN = 'login',
  REGISTRATION = 'registration',
  PROFILE = 'profile',
  GAME = 'game',
  GAME_STARTUP = 'game-startup',
  GAME_RESULTS = 'game-results',
  LEADERBOARD = 'leaderboard',
  FORUM = 'forum',
  FORUM_TOPIC = 'forum-topic',
  NOT_FOUND = 'not-found',
}

export const pagesPaths: Record<pagesNames, string> = {
  [pagesNames.MAIN]: '/',
  [pagesNames.LOGIN]: '/login',
  [pagesNames.REGISTRATION]: '/registration',
  [pagesNames.PROFILE]: '/profile',
  [pagesNames.GAME]: '/game',
  [pagesNames.GAME_STARTUP]: '/game/startup',
  [pagesNames.GAME_RESULTS]: '/game/results',
  [pagesNames.LEADERBOARD]: '/leaderboard',
  [pagesNames.FORUM]: '/forum',
  [pagesNames.FORUM_TOPIC]: '/forum/', // + :topicId
  [pagesNames.NOT_FOUND]: '*',
}
