import { Server, FlatFile } from 'boardgame.io/server';
import { createGame } from '../utils/gameHelpers';

// Create game
const game: any = createGame(1);
const server = Server({
  games: [game],

  db: new FlatFile({
    dir: './here',
    logging: true,
  }),
});

// Start server
server.run(8000);
