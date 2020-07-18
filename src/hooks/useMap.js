import { useState, useEffect, useCallback } from 'react'

import { createMap, createTextureIndex, astar } from '../utils/gameHelpers'

export const useMap = (mapFile, texturesFile, entities, player) => {
  const [map, setMap] = useState(null)
  const [textureIndex, setTextureIndex] = useState(null)

  // Initialize map
  useEffect(() => {
    const fetchMap = async () => {
      const mapUpdate = await createMap(mapFile, entities, player)
      setMap(mapUpdate)
    }

    const fetchTextureIndex = async () => {
      const textureIndexUpdate = await createTextureIndex(texturesFile)
      setTextureIndex(textureIndexUpdate)
    }

    if (mapFile && entities && player) {
      fetchMap()
      fetchTextureIndex()
    }
  }, [entities, mapFile, player, texturesFile])

  useEffect(() => {
    // Will infinite loop unless we invoke useCallback
    // setMap((prev) => updateMap(prev))
  }, [])

  // Invoke useCallback to prevent extra rerenders
  const handleTileClick = useCallback(
    (xPos, yPos) => {
      console.log(`player (${player.x},${player.y}) clicked (${xPos}, ${yPos})`)

      const playerPos = { x: player.x, y: player.y }
      const tilePos = { x: xPos, y: yPos }

      const path = astar(map, playerPos, tilePos)
      console.log('path', path)
    },
    [map, player]
  )

  return [map, setMap, textureIndex, handleTileClick]
}
