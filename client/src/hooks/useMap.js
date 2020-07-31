import { useState, useEffect, useCallback, useContext } from 'react'

import { createMap, createTextureIndex } from '../utils/gameHelpers'
import { findPath } from '../utils/pathing'

import { useSocket } from '../store/SocketContext'

export const useMap = (mapFile, texturesFile, entities, player, setPlayer) => {
  const [map, setMap] = useState(null)
  const [textureIndex, setTextureIndex] = useState(null)
  const [playerPath, setPlayerPath] = useState(null)
  const [isWalking, setIsWalking] = useState(false)
  const [playerPathIndex, setPlayerPathIndex] = useState(null)

  const socket = useSocket()

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

    if (mapFile && entities && player && !map) {
      fetchMap()
      fetchTextureIndex()
    }
  }, [entities, map, mapFile, player, texturesFile])

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
      setPlayerPathIndex(0)
      setIsWalking(true)
    },
    [map, player]
  )

  const handleWalkEnd = useCallback(() => {
    if (playerPathIndex < playerPath.length) {
      const playerPathIndexUpdate = playerPathIndex + 1
      const nextPos = playerPath[playerPathIndexUpdate]

      // This is disgusting
      if (nextPos) {
        // Wee sockets
        socket.emit('UPDATE_POS', nextPos)

        let mapUpdate = map
        mapUpdate[player.pos.y][player.pos.x].players = []
        mapUpdate[nextPos.y][nextPos.x].players = [
          {
            symbol: 'p',
            pos: {
              x: nextPos.x,
              y: nextPos.y,
            },
          },
        ]
        setIsWalking(false)
        setPlayerPathIndex(playerPathIndexUpdate)
        setPlayer({
          ...player,
          pos: nextPos,
        })
        setMap(mapUpdate)
      }
    }
  }, [playerPathIndex, playerPath, socket, map, player, setPlayer])

  return [
    map,
    setMap,
    textureIndex,
    handleTileClick,
    playerPath,
    handleWalkEnd,
    playerPathIndex,
  ]
}
