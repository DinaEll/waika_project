import { useState, type FC } from 'react';
import {
  GamePageStages,
  GameResults,
  ResultStatus,
} from '../model/gamePageData';
import { Game } from './Game/Game';
import cls from './GamePage.module.scss';
import { GameResult } from './GameResult/GameResults';
import { GameStartup } from './GameStartup/GameStartup';

export const GamePage: FC = () => {
  const [currentStage, setCurrentStage] = useState(GamePageStages.startup);
  const [results, setResults] = useState<GameResults | null>(null);

  const changeStage = (stage: GamePageStages) => {
    setCurrentStage(stage);
  };

  const collectGameResults = (status: ResultStatus, time?: string) => {
    setResults({ status, time });
    changeStage(GamePageStages.results);
  };

  const getCurrentStage = () => {
    switch (currentStage) {
      case GamePageStages.startup:
        return <GameStartup changeStage={changeStage} />;
      case GamePageStages.game:
        return <Game collectGameResults={collectGameResults} />;
      case GamePageStages.results:
        return <GameResult changeStage={changeStage} results={results} />;
      default:
        throw new Error('Stage not supported');
    }
  };

  return <div className={cls.gamePage}>{getCurrentStage()}</div>;
};
