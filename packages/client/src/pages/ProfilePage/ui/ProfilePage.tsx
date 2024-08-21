import classNames from 'classnames'
import cls from './ProfilePage.module.scss'

interface ProfilePageProps {
  test?: string
}

export const ProfilePage = (props: ProfilePageProps) => {
  return <div className={classNames(cls.ProfilePage, {})}>ProfilePage</div>
}
