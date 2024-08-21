import classNames from 'classnames'
import cls from './GamePage.module.scss'

interface GamePageProps {
  test?: string
}

export const GamePage = (props: GamePageProps) => {
  return <div className={classNames(cls.GamePage, {})}>GamePage</div>
}
