import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import { GameBoard } from './GameBoard';

import { createGame } from '~/utils/gameHelpers';

export const GameClient = ({ numPlayers }: any): any => {
  const GameClient = Client({
    game: createGame(numPlayers),
    numPlayers,
    board: GameBoard,
    debug: true,
    multiplayer: SocketIO({
      server: 'localhost:8000',
    }),
  });

  return <GameClient />;
};
