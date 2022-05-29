import { useState, useEffect } from 'react'

export const useTiledMap = () => {
  const [mapWidth, setMapWidth] = useState(null)
  const [mapHeight, setMapHeight] = useState(null)
  const [tileWidth, setTileWidth] = useState(null)
  const [tileHeight, setTileHeight] = useState(null)
  const [tilelayers, setTilelayers] = useState(null)
  const [tilesets, setTilesets] = useState(null)

  const getTilesetIndexAtPos = (layer, pos) => {
    const { data, width } = layer
    const { x, y } = pos
    const index = x + y * width
    const tilesetIndex = data[index]

    return tilesetIndex
  }

  // Initialize Tiled map
  useEffect(() => {
    const loadMapFile = async () => {
      try {
        const schema = await fetch('/maps/map.json').then((response) => response.json())

        setMapWidth(schema.width)
        setMapHeight(schema.height)
        setTileWidth(schema.tilewidth)
        setTileHeight(schema.tileheight)
        // Filter object, image, and group layers to satisfy type
        // Reverse layer order to make entities come first
        const tilelayersUpdate = schema.layers.filter((layer) => layer.type === 'tilelayer').reverse()
        setTilelayers(tilelayersUpdate)
        setTilesets(schema.tilesets)
      } catch (err) {
        console.error(err)
      }
    }

    loadMapFile()
  }, [])

  return {
    mapWidth,
    mapHeight,
    tileWidth,
    tileHeight,
    tilelayers,
    tilesets,
    getTilesetIndexAtPos,
  }
}
