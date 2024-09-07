import { Button } from 'antd';
import classNames from 'classnames';
import { FC } from 'react';
import { LogoWithModal } from '@/widgets/LogoWithModal';
import {
  GamePageStages,
  GameResults,
  ResultStatus,
} from '../../model/gamePageData';
import cls from './GameResults.module.scss';

interface Props {
  changeStage: (stage: GamePageStages) => void;
  results: GameResults | null;
}

export const GameResult: FC<Props> = ({ changeStage, results }) => {
  const isWin = results?.status === ResultStatus.win;
  const bestResult = '12:01'; // TODO получать bestResult из лидерборда

  return (
    <div className={classNames(cls.GameResultsPage)}>
      <LogoWithModal
        open
        centered
        closable={false}
        footer={null}
        width={500}
        mask={false}
        transitionName={undefined}
        title={isWin ? 'Congratulations' : 'Sorry, but you lose :('}
      >
        <div className={cls.gameOverPageWrapper}>
          {isWin && (
            <div className={cls.gameOverPageItem}>
              <label className={cls.label}>Your Result</label>
              <div className={cls.result}>{results?.time}</div>
            </div>
          )}

          <div className={cls.gameOverPageItem}>
            <label className={cls.label}>Your Best Result</label>
            <div className={cls.bestResult}>{bestResult}</div>
          </div>
          <div className={cls.titleWrapper}>
            <div className={cls.icon}>{isWin ? '🏆' : '😢'}</div>
          </div>
          <div className={cls.gameOverPageButton}>
            <Button
              type="primary"
              onClick={() => changeStage(GamePageStages.game)}
            >
              Play again
            </Button>
          </div>
        </div>
      </LogoWithModal>
    </div>
  );
};
