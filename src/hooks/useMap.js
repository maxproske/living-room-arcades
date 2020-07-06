import { useState, useEffect } from 'react'

import { createMap } from '../utils/gameHelpers'

export const useMap = () => {
  const [map, setMap] = useState(createMap())

  useEffect(() => {
    console.log('useMap useEffect ran')
  }, [])

  return [map, setMap]
}
