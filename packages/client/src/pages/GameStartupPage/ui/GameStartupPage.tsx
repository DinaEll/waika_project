import classNames from 'classnames'
import cls from './GameStartupPage.module.scss'

interface GameStartupPageProps {
  test?: string
}

export const GameStartupPage = (props: GameStartupPageProps) => {
  return <div className={cls.GameStartupPage}>GameStartupPage</div>
}
