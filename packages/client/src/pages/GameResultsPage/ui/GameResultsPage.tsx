import classNames from 'classnames'
import cls from './GameResultsPage.module.scss'

interface GameResultsPageProps {
  test?: string
}

export const GameResultsPage = (props: GameResultsPageProps) => {
  return (
    <div className={classNames(cls.GameResultsPage, {})}>GameResultsPage</div>
  )
}
