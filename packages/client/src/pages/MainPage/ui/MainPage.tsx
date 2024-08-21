import classNames from 'classnames'
import cls from './MainPage.module.scss'

interface MainPageProps {
  test?: string
}

export const MainPage = (props: MainPageProps) => {
  return <div className={classNames(cls.MainPage, {})}>Main page</div>
}
