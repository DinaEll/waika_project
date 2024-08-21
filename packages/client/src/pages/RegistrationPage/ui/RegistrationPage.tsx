import classNames from 'classnames'
import cls from './RegistrationPage.module.scss'

interface RegistrationPageProps {
  test?: string
}

export const RegistrationPage = (props: RegistrationPageProps) => {
  return (
    <div className={classNames(cls.RegistrationPage, {})}>RegistrationPage</div>
  )
}
