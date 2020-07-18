import { pqPush, pqPop } from './pqueue'

const tiles = {
  blank: '0',
  dirtFloor: '.',
  wall: '#',
}

export const createMap = async (file, entities, player) => {
  const level = await fetch(file).then((response) => response.text())

  // Split multiline string into an array of lines
  const levelLines = level.split(/\r?\n/)
  const numLevelLines = levelLines.length

  // Make each row the same length of the longest row (non-jagged array)
  let longestRow = 0
  for (let i = 0; i < numLevelLines; i++) {
    const rowLength = levelLines[i].length
    if (rowLength > longestRow) {
      longestRow = rowLength
    }
  }

  let map = Array.from(Array(numLevelLines), () =>
    new Array(longestRow).fill(tiles.blank)
  )

  // Set textures
  for (let y = 0; y < levelLines.length; y++) {
    const line = levelLines[y]

    for (let x = 0; x < line.length; x++) {
      const symbol = line.charAt(x)
      const pos = {
        xPos: x,
        yPos: y,
      }
      let tile

      switch (symbol) {
        // Are all these symbols necessary?
        case ' ':
        case '\t':
        case '\n':
        case '\r':
          tile = tiles.blank
          break
        case '.':
          tile = tiles.dirtFloor
          break
        case '#':
          tile = tiles.wall
          break
        default:
          console.warn(`Unknown symbol ${symbol} while creating map`)
          tile = tiles.blank
          break
      }

      map[y][x] = {
        symbol: tile,
        entities: [],
        players: [],
      }
    }
  }

  // Append entities
  entities.forEach((entity) => {
    map[entity.y][entity.x].entities.push(entity.symbol)
  })

  // Append player
  map[player.y][player.x].players.push(player.symbol)

  return map
}

export const createTextureIndex = async (file) => {
  let textureIndex = []

  const atlas = await fetch(file).then((response) => response.text())

  // Split multiline string into an array of lines
  const lines = atlas.split(/\r?\n/)
  lines.forEach((line) => {
    const symbol = line.charAt(0) // Get first character from the string
    const symbolData = line.substr(2).split(',')
    let [x, y, numVariations] = symbolData

    textureIndex[symbol] = []
    for (let i = 0; i < numVariations; i++) {
      // Assumes 64x64 textures
      const pos = {
        xPos: x * 64,
        yPos: y * 64,
      }
      textureIndex[symbol].push(pos)

      // Wrap around if varied images continue on a new line
      x++
      if (x > 62) {
        x = 0
        y++
      }
    }
  })

  return textureIndex
}

export const createEntities = (entities) => {
  return entities
}

export const createPlayer = async () => {
  const player = {
    symbol: 'p',
    x: 2,
    y: 2,
  }
  return player
}

export const createPlayerTextureIndex = async (file) => {
  let textureIndex = []

  const atlas = await fetch(file).then((response) => response.text())

  // Split multiline string into an array of lines
  const lines = atlas.split(/\r?\n/)
  lines.forEach((line) => {
    const direction = line.charAt(0) // Get first character from the string
    const directionData = line.substr(2).split(',')
    let [x, y, numAnimations] = directionData

    textureIndex[direction] = []
    for (let i = 0; i < numAnimations; i++) {
      // Assumes 43x70 textures
      const pos = {
        xPos: x * 43,
        yPos: y * 70,
      }
      textureIndex[direction].push(pos)
    }
  })

  return textureIndex
}

// Astar implementation by Jack Mott
// translated from Go to JavaScript
// https://www.youtube.com/watch?v=FESffgzrxJU
export const astar = (level, start, goal) => {
  let frontier = [] // Growing/shrinking frontier isn't optimal
  frontier = pqPush(frontier, start, 1) // Priority of 1

  let cameFrom = [] // Keep a map of where we came from
  const startKey = JSON.stringify(start)
  cameFrom[startKey] = start // Start didn't come from anywhere

  let costSoFar = [] // Read to handle varying costs of travel
  costSoFar[startKey] = 0

  let current
  while (frontier.length > 0) {
    ;[frontier, current] = pqPop(frontier) // Get starting node from the beginning of it
    const currentKey = JSON.stringify(current)

    // We can't directly compare objects, so compare their properties
    if (current.x === goal.x && current.y === goal.y) {
      // Reverse slice
      let path = []

      // We've found our path
      let p = current
      while (p.x !== start.x || p.y !== start.y) {
        path.push(p)
        const pKey = JSON.stringify(p)
        p = cameFrom[pKey]
      }

      path.push(p)

      // Reverse array
      for (let i = 0, j = path.length - 1; i < j; i = i + 1, j = j - 1) {
        let tmp = path[i]
        path[i] = path[j]
        path[j] = tmp
      }

      return path
    }

    let neighbors = getNeighbors(level, current)

    neighbors.forEach((next) => {
      const nextKey = JSON.stringify(next)

      let newCost = costSoFar[currentKey] + 1 // Always 1 for now
      let exists = costSoFar[nextKey]
      if (!exists || newCost < costSoFar[nextKey]) {
        costSoFar[nextKey] = newCost
        // Manhatten distance (how many nodes in a straight line)
        let xDist = Math.abs(goal.x - next.x)
        let yDist = Math.abs(goal.y - next.y)
        let priority = newCost + xDist + yDist
        frontier = pqPush(frontier, next, priority) // Stick a new priority onto the queue
        cameFrom[nextKey] = current // Update where we came from
      }
    })
  }

  return null
}

// Return array of positions that are adjacent
const getNeighbors = (level, pos) => {
  let neighbors = []
  let dirs = []
  dirs.push({ x: pos.x - 1, y: pos.y })
  dirs.push({ x: pos.x + 1, y: pos.y })
  dirs.push({ x: pos.x, y: pos.y - 1 })
  dirs.push({ x: pos.x, y: pos.y + 1 })

  dirs.forEach((dir) => {
    if (canWalk(level, dir)) {
      neighbors.push(dir)
    }
  })

  return neighbors
}

const canWalk = (level, dir) => {
  return true
}
