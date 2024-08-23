import cls from './LeaderboardPage.module.scss'

interface LeaderboardPageProps {
  test?: string
}

export const LeaderboardPage = (props: LeaderboardPageProps) => {
  return <div className={cls.LeaderboardPage}>LeaderboardPage</div>
}
