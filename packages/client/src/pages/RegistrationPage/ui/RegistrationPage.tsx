import cls from './RegistrationPage.module.scss'

interface RegistrationPageProps {
  test?: string
}

export const RegistrationPage = (props: RegistrationPageProps) => {
  return <div className={cls.RegistrationPage}>RegistrationPage</div>
}
