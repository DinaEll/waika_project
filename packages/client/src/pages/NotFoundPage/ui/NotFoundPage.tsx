import classNames from 'classnames'
import cls from './NotFoundPage.module.scss'

interface NotFoundPageProps {
  test?: string
}

export const NotFoundPage = (props: NotFoundPageProps) => {
  return <div className={classNames(cls.NotFoundPage, {})}>NotFoundPage</div>
}
