export const MAP_WIDTH = 8
export const MAP_HEIGHT = 8

export const createMap = () =>
  Array.from(Array(MAP_HEIGHT), () => new Array(MAP_WIDTH).fill([0, 'clear']))
