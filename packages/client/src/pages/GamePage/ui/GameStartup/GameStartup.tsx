import { Button } from 'antd';
import { FC } from 'react';
import RulesImg from '@/shared/assets/images/rules.png';
import { LogoWithModal } from '@/widgets/LogoWithModal';
import { GamePageStages } from '../../model/gamePageData';
import cls from './GameStartup.module.scss';

interface Props {
  changeStage: (stage: GamePageStages) => void;
}

export const GameStartup: FC<Props> = ({ changeStage }) => {
  return (
    <LogoWithModal
      open
      centered
      closable={false}
      footer={null}
      width={500}
      mask={false}
      transitionName={undefined}
      title="Start game"
    >
      <div className={cls.wrapper}>
        <div className={cls.rules}>
          <img src={RulesImg} alt="Rules" className={cls.rulesImg} />
        </div>

        <div className={cls.btnWrapper}>
          <Button
            type="primary"
            onClick={() => changeStage(GamePageStages.game)}
          >
            Start
          </Button>
        </div>
      </div>
    </LogoWithModal>
  );
};
