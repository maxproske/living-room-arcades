import { useState, useEffect } from 'react'

import { createMap, createTextureIndex } from '../utils/gameHelpers'

export const useMap = (mapFile, texturesFile, entities) => {
  const [map, setMap] = useState(null)
  const [textureIndex, setTextureIndex] = useState(null)

  // Initialize map
  useEffect(() => {
    const fetchMap = async () => {
      const mapUpdate = await createMap(mapFile, entities)
      setMap(mapUpdate)
    }

    const fetchTextureIndex = async () => {
      const textureIndexUpdate = await createTextureIndex(texturesFile)
      setTextureIndex(textureIndexUpdate)
    }

    if (mapFile && entities) {
      fetchMap()
      fetchTextureIndex()
    }
  }, [entities, mapFile, texturesFile])

  useEffect(() => {
    // Will infinite loop unless we invoke useCallback
    // setMap((prev) => updateMap(prev))
  }, [])

  return [map, setMap, textureIndex]
}
