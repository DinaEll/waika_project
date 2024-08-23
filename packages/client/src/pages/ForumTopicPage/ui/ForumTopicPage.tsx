import cls from './ForumTopicPage.module.scss'

interface ForumTopicPageProps {
  test?: string
}

export const ForumTopicPage = (props: ForumTopicPageProps) => {
  return <div className={cls.ForumTopicPage}>ForumTopicPage</div>
}
