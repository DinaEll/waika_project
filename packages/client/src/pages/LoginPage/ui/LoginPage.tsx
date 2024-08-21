import classNames from 'classnames'
import cls from './LoginPage.module.scss'

interface LoginPageProps {
  test?: string
}

export const LoginPage = (props: LoginPageProps) => {
  return <div className={classNames(cls.LoginPage, {})}>LoginPage</div>
}
