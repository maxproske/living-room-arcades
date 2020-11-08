import { pqPush, pqPop } from './pqueue';

// Astar implementation by Jack Mott
// translated from Go to JavaScript
// https://www.youtube.com/watch?v=FESffgzrxJU
export const findPath = (level: any, start: any, goal: any) => {
  let frontier: number[] = []; // Growing/shrinking frontier isn't optimal
  frontier = pqPush(frontier, start, 1); // Priority of 1

  const cameFrom: any[] = []; // Keep a map of where we came from
  const startKey: any = JSON.stringify(start);
  cameFrom[startKey] = start; // Start didn't come from anywhere

  const costSoFar: number[] = []; // Read to handle varying costs of travel
  costSoFar[startKey] = 0;

  let current: { x: number; y: number };
  while (frontier.length > 0) {
    [frontier, current] = pqPop(frontier); // Get starting node from the beginning of it
    const currentKey: any = JSON.stringify(current);

    console.log('frontier', frontier);

    // We can't directly compare objects, so compare their properties
    if (current.x === goal.x && current.y === goal.y) {
      // Reverse slice
      const path = [];

      // We've found our path
      let p: any = current;
      while (p.x !== start.x || p.y !== start.y) {
        path.push(p);
        const pKey: any = JSON.stringify(p);
        p = cameFrom[pKey];
      }
      path.push(p);

      // Reverse array
      for (let i = 0, j = path.length - 1; i < j; i++, j--) {
        const tmp: any = path[i];
        path[i] = path[j];
        path[j] = tmp;
      }

      console.log(
        `Found path: ${path.map((pos) => `${pos.x},${pos.y}`).join(' → ')}`
      );

      return path;
    }

    const neighbors = getNeighbors(level, current);

    neighbors.forEach((next: any) => {
      const nextKey: any = JSON.stringify(next);

      const newCost = costSoFar[currentKey] + 1; // Always 1 for now
      const exists = costSoFar[nextKey] !== undefined;

      if (!exists || newCost < costSoFar[nextKey]) {
        costSoFar[nextKey] = newCost;
        // Manhatten distance (how many nodes in a straight line)
        const xDist = Math.floor(Math.abs(goal.x - next.x));
        const yDist = Math.floor(Math.abs(goal.y - next.y));
        const priority = newCost + xDist + yDist;
        frontier = pqPush(frontier, next, priority); // Stick a new priority onto the queue
        cameFrom[nextKey] = current; // Update where we came from
      }
    });
  }

  return null;
};

// Return array of positions that are adjacent
const getNeighbors = (level: any, pos: any) => {
  const neighbors: any = [];
  const dirs = [
    { x: pos.x - 1, y: pos.y },
    { x: pos.x + 1, y: pos.y },
    { x: pos.x, y: pos.y - 1 },
    { x: pos.x, y: pos.y + 1 },
  ];

  dirs.forEach((dir) => {
    if (canWalk(level, dir)) {
      neighbors.push(dir);
    }
  });

  return neighbors;
};

const canWalk = (level: any, pos: any) => {
  if (!inBounds(level, pos)) {
    return false;
  }

  const tile = level[pos.y][pos.x];
  if (tile.symbol !== '.') {
    return false;
  }

  return true;
};

// Check if x,y is inbounds
const inBounds = (level: any, pos: any) => {
  return (
    pos.x < level[0].length && pos.y < level.length && pos.x >= 0 && pos.y >= 0
  );
};
