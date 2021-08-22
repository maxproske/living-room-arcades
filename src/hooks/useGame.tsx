import { useState, useEffect, useMemo, memo } from 'react';
import { INVALID_MOVE } from 'boardgame.io/core';
import { Client } from 'boardgame.io/react';

export const useGame = ({ mapHeight, mapWidth }) => {
  const [game, setGame] = useState(null);

  useEffect(() => {
    if (game === null) {
      const initialGame = {
        setup: () => ({
          cells: [],
        }),
      };

      setGame(initialGame);
    }
  }, [game]);

  const handleClick = () => {
    console.log('clicked!');
  };

  const GameClient = useMemo(
    () =>
      Client({
        game,
        numPlayers: 1,
      }),
    [game]
  );

  return { game, GameClient, handleClick };
};
