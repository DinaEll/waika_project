import cls from './LoginPage.module.scss'

interface LoginPageProps {
  test?: string
}

export const LoginPage = (props: LoginPageProps) => {
  return <div className={cls.LoginPage}>LoginPage</div>
}
