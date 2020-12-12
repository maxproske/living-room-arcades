import { Server } from 'boardgame.io/server';
import { createGame } from '../utils/gameHelpers';

const game: any = createGame(1);
const server = Server({
  games: [game],
});

server.run(8000);
