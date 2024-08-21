import classNames from 'classnames'
import cls from './ForumPage.module.scss'

interface ForumPageProps {
  test?: string
}

export const ForumPage = (props: ForumPageProps) => {
  return <div className={classNames(cls.ForumPage, {})}>ForumPage</div>
}
