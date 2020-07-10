export const MAP_WIDTH = 8
export const MAP_HEIGHT = 8

export const createMap = async (file) => {
  const level = await fetch(file).then((response) => response.text())

  // TODO: convert text to level lines

  return Array.from(Array(MAP_HEIGHT), () =>
    new Array(MAP_WIDTH).fill([0, 'clear'])
  )
}

export const createItems = () => {
  let map = Array.from(Array(MAP_HEIGHT), () => new Array(MAP_WIDTH).fill([0]))
  map[1][1] = ['item']
  return map
}
