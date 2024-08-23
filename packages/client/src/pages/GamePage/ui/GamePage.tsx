import cls from './GamePage.module.scss'

interface GamePageProps {
  test?: string
}

export const GamePage = (props: GamePageProps) => {
  return <div className={cls.GamePage}>GamePage</div>
}
