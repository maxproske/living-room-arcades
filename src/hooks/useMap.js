import { useState, useEffect, useCallback } from 'react'

import { createMap, createTextureIndex } from '../utils/gameHelpers'
import { findPath } from '../utils/pathing'

export const useMap = (mapFile, texturesFile, entities, player) => {
  const [map, setMap] = useState(null)
  const [textureIndex, setTextureIndex] = useState(null)
  const [playerPath, setPlayerPath] = useState(null)
  const [isWalking, setIsWalking] = useState(false)
  const [pathIndex, setPathIndex] = useState(null)

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
    (tile) => {
      const startPos = {
        x: player.pos.x,
        y: player.pos.y,
      }
      const endPos = {
        x: tile.pos.x,
        y: tile.pos.y,
      }
      const playerPathUpdate = findPath(map, startPos, endPos)
      setPlayerPath(playerPathUpdate)
      setIsWalking(true)
    },
    [map, player]
  )

  const movePlayer = useCallback(() => {
    if (isWalking) {
    }
  }, [isWalking])

  return [map, setMap, textureIndex, handleTileClick, playerPath]
}
