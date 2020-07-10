import { useState, useEffect } from 'react'

import { createMap } from '../utils/gameHelpers'

export const useMap = (file, items) => {
  const [map, setMap] = useState(null)

  // Initialize map
  useEffect(() => {
    const fetchMap = async () => {
      const mapUpdate = await createMap(file)
      setMap(mapUpdate)
    }

    fetchMap()
  }, [file])

  useEffect(() => {
    // Will infinite loop unless we invoke useCallback
    // setMap((prev) => updateMap(prev))
  }, [])

  return [map, setMap]
}
