import { Button, Flex, Modal } from 'antd';
import { useEffect, useRef, useState, type FC } from 'react';
import { Mahjong } from '@/entities/mahjong';
import MainLogo from '@/shared/assets/svg/main-logo.svg';
import { useEffectOnce } from '@/shared/hooks';
import { formatTime, getDurationTime } from '@/shared/utils';
import { ResultStatus } from '../../model/gamePageData';
import { GameButtonFullscreen } from '../GameButtonFullscreen/GameButtonFullscreen';
import { GameTimer } from '../GameTimer/GameTimer';
import cls from './Game.module.scss';

interface Props {
  collectGameResults: (status: ResultStatus, time?: string) => void;
}

const initialMahjongOptions = {
  columns: 7,
  rows: 7,
  levels: 3,
  shuffleCount: 3,
};

export const Game: FC<Props> = ({ collectGameResults }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mahjongRef = useRef<Mahjong>();
  const [startTime, setStartTime] = useState<Date>();
  const [finishTime, setFinishTime] = useState<Date>();
  const [remainingShuffles, setRemainingShuffles] = useState<number>();
  const [remainingTiles, setRemainingTiles] = useState<number>();
  const [availablePairs, setAvailablePairs] = useState<number>();

  useEffect(() => {
    if (remainingShuffles && remainingShuffles > 0 && availablePairs === 0) {
      Modal.confirm({
        title: 'No tiles available',
        content: 'You can use shuffle',
        cancelButtonProps: { style: { display: 'none' } },
      });
    }

    if (!('Notification' in window)) {
      console.log('Browser does not support the notifications');
    } else {
      void Notification.requestPermission();
    }
  }, [availablePairs, remainingShuffles]);

  const sendNotification = (count: number) => {
    if (Notification.permission === 'granted') {
      new Notification('Waika Mahjong', {
        body: `${count} shuffles left`,
        icon: MainLogo,
      });
    }
  };

  const onShuffleChange = (count: number) => {
    setRemainingShuffles(count);
    if (count !== initialMahjongOptions.shuffleCount) {
      sendNotification(count);
    }
  };

  const onAvailablePairsChange = (count: number) => {
    setAvailablePairs(count);
  };

  const onRemainingTilesChange = (count: number) => {
    setRemainingTiles(count);
  };

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
      ...initialMahjongOptions,
      onStartCallback,
      onWinCallback,
      onLoseCallback,
      onRemainingTilesChange,
      onAvailablePairsChange,
      onShuffleChange,
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
    <div className={cls.game}>
      <Flex gap={8} align="center">
        <GameButtonFullscreen />
        <Button onClick={onShuffleClick}>Shuffle</Button>
        <Button onClick={onRestartClick}>Restart</Button>
        <GameTimer
          startTime={startTime?.toISOString()}
          finishTime={finishTime?.toISOString()}
        />
        <span>Shuffles left {remainingShuffles}</span>
        <span>Tiles left {remainingTiles}</span>
        <span>Available Pairs {availablePairs}</span>
      </Flex>
      <canvas ref={canvasRef} className={cls.field} />
    </div>
  );
};
