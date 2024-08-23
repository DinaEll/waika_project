import cls from './ForumPage.module.scss'

interface ForumPageProps {
  test?: string
}

export const ForumPage = (props: ForumPageProps) => {
  return <div className={cls.ForumPage}>ForumPage</div>
}
