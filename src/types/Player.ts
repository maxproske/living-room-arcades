export interface Pos {
  x: number;
  y: number;
}

export interface Player {
  id: string; // The id of our player
  name: string; // The name of our player
  pos: Pos; // A record of the categories a player can score in. The category may have been scored (number) or is yet to be scored (null)
}
