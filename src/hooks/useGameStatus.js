import { useState, useEffect, useMemo } from 'react'

export const useGameStatus = () => {
  const [frames, setFrames] = useState(0)

  useEffect(() => {
    // console.log(`Frame ${frames}`)
  }, [frames])

  const tick = () => {
    setFrames((prev) => prev + 1)
  }

  return [frames, tick]
}
