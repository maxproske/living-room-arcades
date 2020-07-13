import { useState, useEffect } from 'react'

import { createMap, createTextureIndex } from '../utils/gameHelpers'

export const useMap = (mapFile, texturesFile) => {
  const [map, setMap] = useState(null)
  const [textureIndex, setTextureIndex] = useState(null)

  // Initialize map
  useEffect(() => {
    const fetchMap = async () => {
      const mapUpdate = await createMap(mapFile)
      setMap(mapUpdate)
    }

    const fetchTextureIndex = async () => {
      const textureIndexUpdate = await createTextureIndex(texturesFile)
      setTextureIndex(textureIndexUpdate)
    }

    fetchMap()
    fetchTextureIndex()
  }, [mapFile, texturesFile])

  useEffect(() => {
    // Will infinite loop unless we invoke useCallback
    // setMap((prev) => updateMap(prev))
  }, [])

  return [map, setMap, textureIndex]
}
