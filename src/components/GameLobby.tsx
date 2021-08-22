import { Lobby } from 'boardgame.io/react';

// Components
import { GameBoard } from './GameBoard';

// Utils
import { createGame } from '~/utils/gameHelpers';

export const GameLobby = () => {
  return (
    <Lobby
      gameServer={`localhost:8000`}
      lobbyServer={`localhost:8000`}
      gameComponents={[{ game: createGame(1), board: GameBoard }]}
    />
  );
};
