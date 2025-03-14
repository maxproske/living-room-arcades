import { useState, useEffect, useCallback } from 'react'
import { findPath } from '~/utils/pathing'
import { useUser } from '../stores/UserProvider'

export const usePlayer = ({ map, emitPlayerPos }) => {
  const [player, setPlayer] = useState(null)
  const [playerTextureIndex, setPlayerTextureIndex] = useState(null)
  const [playerPath, setPlayerPath] = useState(null)
  const [isWalking, setIsWalking] = useState(false)
  const [playerPathIndex, setPlayerPathIndex] = useState(null)
  const { state } = useUser()

  useEffect(() => {
    const fetchPlayer = async () => {
      const playerUpdate = {
        pos: {
          x: 8,
          y: 8,
        },
      }

      setPlayer(playerUpdate)
    }

    const fetchTextureIndex = async () => {
      const playerTextureIndexUpdate = []

      const playerDirections = await fetch('/assets/player.json').then((response) => response.json())

      playerDirections.forEach((playerDirection) => {
        const { direction, x, y, numAnimations } = playerDirection

        playerTextureIndexUpdate[direction] = []
        for (let i = 0; i < numAnimations; i++) {
          // Assumes 43x70 textures
          const pos = {
            xPos: x * 43,
            yPos: y * 70,
          }
          playerTextureIndexUpdate[direction].push(pos)
        }
      })

      setPlayerTextureIndex(playerTextureIndexUpdate)
    }

    fetchPlayer()
    fetchTextureIndex()
  }, [])

  useEffect(() => {
    if (player?.pos && state.dir && emitPlayerPos) {
      emitPlayerPos({ pos: player.pos, dir: state.dir })
    }
  }, [player?.pos, state.dir, emitPlayerPos])

  const handleTileClick = useCallback(
    (tile) => {
      if (!player) return

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
        const mapUpdate = map
        mapUpdate[player.pos.y][player.pos.x].players = []
        mapUpdate[nextPos.y][nextPos.x].players = [
          {
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
      }
    }
  }, [map, playerPathIndex, player, playerPath, setPlayer])

  return {
    player,
    setPlayer,
    playerTextureIndex,
    handleTileClick,
    handleWalkEnd,
    playerPath,
    playerPathIndex,
  }
}
