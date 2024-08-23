import cls from './ProfilePage.module.scss'

interface ProfilePageProps {
  test?: string
}

export const ProfilePage = (props: ProfilePageProps) => {
  return <div className={cls.ProfilePage}>ProfilePage</div>
}
