import { Button, Flex } from 'antd';
import { useRef, useState, type FC } from 'react';
import { Mahjong } from '@/entities/mahjong';
import { useEffectOnce } from '@/shared/hooks';
import { formatTime, getDurationTime } from '@/shared/utils';
import { ResultStatus } from '../../model/gamePageData';
import { GameButtonFullscreen } from '../GameButtonFullscreen/GameButtonFullscreen';
import { GameTimer } from '../GameTimer/GameTimer';
import cls from './Game.module.scss';

interface Props {
  collectGameResults: (status: ResultStatus, time?: string) => void;
}

export const Game: FC<Props> = ({ collectGameResults }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mahjongRef = useRef<Mahjong>();
  const [startTime, setStartTime] = useState<Date>();
  const [finishTime, setFinishTime] = useState<Date>();

  const onStartCallback = (startTime?: Date): undefined => {
    setStartTime(startTime);
    setFinishTime(undefined);
    if (startTime) {
      console.log(`start game at ${startTime.toISOString()}`);
    }
  };

  const onWinCallback = (startTime?: Date, finishTime?: Date): undefined => {
    if (startTime && finishTime) {
      collectGameResults(
        ResultStatus.win,
        formatTime(getDurationTime(startTime, finishTime)),
      );
    }
    setFinishTime(finishTime);
  };

  const onLoseCallback = () => {
    collectGameResults(ResultStatus.lose);
  };

  const createGame = () => {
    if (!canvasRef.current) {
      throw new Error('Canvas not found');
    }

    const mahjongOptions = {
      columns: 4,
      rows: 4,
      shuffleCount: 3,
      tileSize: 50,
      onStartCallback,
      onWinCallback,
      onLoseCallback,
    };
    mahjongRef.current = new Mahjong(canvasRef.current, mahjongOptions);
    mahjongRef.current.start();
  };

  const destroyGame = () => {
    if (mahjongRef.current) {
      mahjongRef.current.finish();
      mahjongRef.current.destroy();
      mahjongRef.current = undefined;
    }
  };

  useEffectOnce(() => {
    createGame();

    return () => {
      destroyGame();
    };
  });

  const onRestartClick = () => {
    destroyGame();
    createGame();
  };

  const onShuffleClick = () => {
    mahjongRef.current?.handleShuffle();
  };

  return (
    <div className={cls.gamePage}>
      <Flex gap={8} align="center">
        <GameButtonFullscreen />
        <Button onClick={onShuffleClick}>Shuffle</Button>
        <Button onClick={onRestartClick}>Restart</Button>
        <GameTimer
          startTime={startTime?.toISOString()}
          finishTime={finishTime?.toISOString()}
        />
      </Flex>
      <canvas ref={canvasRef} className={cls.gameField} />
    </div>
  );
};
