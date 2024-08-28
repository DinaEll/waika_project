import MainLogo from '@/shared/assets/svg/main-logo.svg'
import { appConfig } from '@/shared/config'
import cls from './Logo.module.scss'

export const Logo = () => {
  return <img src={MainLogo} alt={appConfig.appName} className={cls.logo} />
}
