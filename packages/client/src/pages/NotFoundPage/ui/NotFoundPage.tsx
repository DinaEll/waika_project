import cls from './NotFoundPage.module.scss'

interface NotFoundPageProps {
  test?: string
}

export const NotFoundPage = (props: NotFoundPageProps) => {
  return <div className={cls.NotFoundPage}>NotFoundPage</div>
}
