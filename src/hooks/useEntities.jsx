import { useState, useEffect } from 'react'

import { createEntities } from '../utils/gameHelpers'

export const useEntities = (file) => {
  const [entities, setEntities] = useState(null)

  // Initialize entities
  useEffect(() => {
    const fetchEntities = async () => {
      const textureIndexUpdate = await createEntities(file)
      setEntities(textureIndexUpdate)
    }

    fetchEntities()
  }, [file])

  return [entities, setEntities]
}
