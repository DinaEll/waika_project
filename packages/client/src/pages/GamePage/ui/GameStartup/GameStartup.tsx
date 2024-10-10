import { Button } from 'antd';
import { FC } from 'react';
import RulesImg from '@/shared/assets/images/rules.png';
import { MainContainer } from '@/widgets';
import cls from './GameStartup.module.scss';

interface Props {
  onStartClick: () => void;
}

export const GameStartup: FC<Props> = ({ onStartClick }) => {
  return (
    <MainContainer title="Start game">
      <div className={cls.wrapper}>
        <div className={cls.rules}>
          <img src={RulesImg} alt="Rules" className={cls.rulesImg} />
        </div>

        <div className={cls.btnWrapper}>
          <Button type="primary" onClick={onStartClick}>
            Start
          </Button>
        </div>
      </div>
    </MainContainer>
  );
};
