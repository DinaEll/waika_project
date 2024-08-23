import cls from './MainPage.module.scss'

interface MainPageProps {
  test?: string
}

export const MainPage = (props: MainPageProps) => {
  return <div className={cls.MainPage}>Main page</div>
}
