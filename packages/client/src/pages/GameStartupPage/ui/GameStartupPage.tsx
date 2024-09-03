import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import RulesImg from '@/shared/assets/images/rules.png';
import { getPageUrl } from '@/shared/config/router/routerConfig';
import { LogoWithModal } from '@/widgets/LogoWithModal';
import cls from './GameStartupPage.module.scss';

export const GameStartupPage = () => {
  return (
    <LogoWithModal
      open={true}
      centered={true}
      closable={false}
      footer={null}
      width={500}
      mask={false}
      transitionName={''}
      title="Start game"
    >
      <div className={cls.wrapper}>
        <div className={cls.rules}>
          <img src={RulesImg} alt="Rules" className={cls.rulesImg} />
        </div>

        <div className={cls.btnWrapper}>
          <NavLink to={getPageUrl('game')}>
            <Button type="primary">Start</Button>
          </NavLink>
        </div>
      </div>
    </LogoWithModal>
  );
};
