const tiles = {
  blank: {
    name: 'blank',
  },
  dirtFloor: {
    name: 'dirt floor',
  },
  wall: {
    name: 'wall',
  },
}

export const createMap = async (file) => {
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
      map[y][x] = tile
    }
  }

  console.log(map)
  return map
}

export const createItems = () => {}

export const createTextureIndex = async (file) => {
  let textureIndex = []

  const atlas = await fetch(file).then((response) => response.text())

  // Split multiline string into an array of lines
  const atlasLines = atlas.split(/\r?\n/)
  atlasLines.forEach((line) => {
    const symbol = line.charAt(0) // Get first character from the string
    const symbolData = line.substr(2).split(',')
    let [x, y, numVariations] = symbolData

    textureIndex[symbol] = []
    for (let i = 0; i < numVariations; i++) {
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

  console.log('textureIndex', textureIndex)
  return textureIndex
}
