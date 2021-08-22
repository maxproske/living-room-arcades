import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';

// Components
import { GameBoard } from './GameBoard';

// Utils
import { createGame } from '~/utils/gameHelpers';

export const GameClient = ({ playerID, matchID, credentials }): any => {
  const GameClient = Client({
    game: createGame(1),
    numPlayers: 1,
    board: GameBoard,
    debug: true,
    multiplayer: SocketIO({
      server: 'localhost:8000',
    }),
  });

  return (
    <GameClient
      playerID={playerID}
      matchID={matchID}
      credentials={credentials}
    />
  );
};
