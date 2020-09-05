const tiles = {
  blank: '0',
  dirtFloor: '.',
  wall: '#',
}

export const createMap = async (file, entitiesFile, player) => {
  const level = await fetch(file).then((response) => response.text())
  const entities = await fetch(entitiesFile).then((response) => response.json())

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
  map[player.pos.y][player.pos.x].players.push(player.symbol)

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
    pos: {
      x: 2,
      y: 2,
    },
  }
  return player
}

export const createPlayerTextureIndex = async (file) => {
  let textureIndex = []

  const atlas = await fetch(file).then((response) => response.text())

  // Split multiline string into an array of lines
  const lines = atlas.split(/\r?\n/)
  lines.forEach((line) => {
    const direction = line.substring(0, 2) // Get first character from the string
    const directionData = line.substr(3).split(',')
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
