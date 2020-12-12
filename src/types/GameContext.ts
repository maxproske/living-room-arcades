interface GameOver {
  winner: number;
}

interface Random {
  D6: () => number;
}

interface Events {
  updateMyPos: () => void;
  updateDestinationPos: () => void;
}

export interface GameContext {
  numPlayers?: number;
  turn?: number;
  currentPlayer: number;
  gameover?: GameOver;
  random?: Random;
  events?: Events;
}
