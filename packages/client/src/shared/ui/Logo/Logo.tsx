import MainLogo from '@/shared/assets/svg/main-logo.svg';
import cls from './Logo.module.scss';

export const Logo = () => {
  return <img src={MainLogo} alt={__APP_NAME__} className={cls.logo} />;
};
