import { useState, useEffect } from 'react'

// A dedicated hook for camera functionality
export const useCamera = (playerPos) => {
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (!playerPos) return

    // Calculate the camera position based on player position
    const TILE_SIZE = 64
    const ISOMETRIC_FACTOR = Math.sqrt(2) / 2

    const x = -((playerPos.x - playerPos.y) * TILE_SIZE * ISOMETRIC_FACTOR)
    const y = -((playerPos.x + playerPos.y) * TILE_SIZE * ISOMETRIC_FACTOR * 0.5) + 200 // Vertical offset

    // Apply smooth transition using state update
    setCameraPosition({ x, y })
  }, [playerPos])

  return cameraPosition
}
