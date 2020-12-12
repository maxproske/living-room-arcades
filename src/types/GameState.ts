import { Player, Pos } from '~/types/Player';

export interface GameState {
  players: Player[]; // An array of players taking part in the game
  myPos: Pos;
  destinationPos: Pos;
}
