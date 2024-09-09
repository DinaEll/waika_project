export const enum GamePageStages {
  startup = 'startup',
  game = 'game',
  results = 'results',
}

export const enum ResultStatus {
  win = 'win',
  lose = 'lose',
}

export interface GameResults {
  status: ResultStatus;
  time?: string;
}
