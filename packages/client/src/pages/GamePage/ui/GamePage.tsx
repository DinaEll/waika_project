import { useState, type FC } from 'react';
import { usePage } from '@/shared/hooks/usePage';
import { initPageBase } from '@/utils/initPageFunctions/initPageBase';
import {
  GamePageStages,
  GameResults,
  ResultStatus,
} from '../model/gamePageData';
import { Game } from './Game/Game';
import { GameResult } from './GameResult/GameResults';
import { GameStartup } from './GameStartup/GameStartup';

export const GamePage: FC = () => {
  const [currentStage, setCurrentStage] = useState(GamePageStages.startup);
  const [results, setResults] = useState<GameResults | null>(null);

  usePage({ initPage: initPageBase });

  const changeStage = (stage: GamePageStages) => {
    setCurrentStage(stage);
  };

  const collectGameResults = (status: ResultStatus, time?: string) => {
    setResults({ status, time });
    changeStage(GamePageStages.results);
  };

  const startGame = () => {
    changeStage(GamePageStages.game);
  };

  switch (currentStage) {
    case GamePageStages.startup:
      return <GameStartup onStartClick={startGame} />;
    case GamePageStages.game:
      return <Game collectGameResults={collectGameResults} />;
    case GamePageStages.results:
      return <GameResult onPlayAgainClick={startGame} results={results} />;
    default:
      throw new Error('Stage not supported');
  }
};
