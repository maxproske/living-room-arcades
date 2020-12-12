import { v4 as uuidv4 } from 'uuid';

// Types
import { GameState } from '~/types/GameState';
import { GameContext } from '~/types/GameContext';
import { Player, Pos } from '~/types/Player';

export const createEntities = (entities: any) => {
  return entities;
};

const spawnPos: Pos = {
  x: 5,
  y: 5,
};

export const createGame = (numPlayers: number): any => {
  return {
    name: 'living-room-arcades',
    setup: () => {
      const players: Player[] = [];
      for (let i = 0; i < numPlayers; i++) {
        players.push({
          id: uuidv4(),
          name: 'Player',
          pos: spawnPos,
        });
      }

      const myPos = spawnPos;
      const destinationPos = null;

      return {
        players,
        myPos,
        destinationPos,
      };
    },
    moves: {
      updateMyPos: (G: GameState, ctx: GameContext, pos: Pos) => {
        G.myPos = pos;
      },
      updateDestinationPos: (G: GameState, ctx: GameContext, pos: Pos) => {
        G.destinationPos = pos;
      },
    },
  };
};
