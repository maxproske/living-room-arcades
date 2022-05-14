import { pqPush, pqPop } from "./pqueue";

// Astar implementation by Jack Mott
// translated from Go to JavaScript
// https://www.youtube.com/watch?v=FESffgzrxJU
export const findPath = (level, start, goal) => {
  let frontier = []; // Growing/shrinking frontier isn't optimal
  frontier = pqPush(frontier, start, 1); // Priority of 1

  const cameFrom = []; // Keep a map of where we came from
  const startKey = JSON.stringify(start);
  cameFrom[startKey] = start; // Start didn't come from anywhere

  const costSoFar = []; // Read to handle varying costs of travel
  costSoFar[startKey] = 0;

  let current;
  while (frontier.length > 0) {
    [frontier, current] = pqPop(frontier); // Get starting node from the beginning of it
    const currentKey = JSON.stringify(current);

    // We can't directly compare objects, so compare their properties
    if (current.x === goal.x && current.y === goal.y) {
      // Reverse slice
      const path = [];

      // We've found our path
      let p = current;
      while (p.x !== start.x || p.y !== start.y) {
        path.push(p);
        const pKey = JSON.stringify(p);
        p = cameFrom[pKey];
      }
      path.push(p);

      // Reverse array
      for (let i = 0, j = path.length - 1; i < j; i++, j--) {
        const tmp = path[i];
        path[i] = path[j];
        path[j] = tmp;
      }

      console.log(
        `Found path: ${path.map((pos) => `${pos.x},${pos.y}`).join(" → ")}`
      );

      return path;
    }

    const neighbors = getNeighbors(level, current);

    neighbors.forEach((next) => {
      const nextKey = JSON.stringify(next);

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
const getNeighbors = (level, pos) => {
  const neighbors = [];
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

const canWalk = (level, pos) => {
  if (!inBounds(level, pos)) {
    return false;
  }

  const tile = level[pos.y][pos.x];
  if (tile.walkable === 0) {
    return false;
  }
  if (tile.obstacles !== 0) {
    return false;
  }

  return true;
};

// Check if x,y is inbounds
const inBounds = (level, pos) => {
  return (
    pos.x < level[0].length && pos.y < level.length && pos.x >= 0 && pos.y >= 0
  );
};
