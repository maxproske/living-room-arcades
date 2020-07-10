import { useState, useEffect, useCallback } from 'react'

export const useGameStatus = () => {
  const [frames, setFrames] = useState(0)

  // Is it necessary to wrap this in a useCallback?
  const tick = useCallback(() => {
    setFrames(frames + 1)
  }, [frames])

  return [frames, tick]
}
