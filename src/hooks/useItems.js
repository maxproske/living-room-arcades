import { useState, useEffect } from 'react'

import { createItems } from '../utils/gameHelpers'

export const useItems = () => {
  const [items, setItems] = useState(createItems())

  useEffect(() => {
    console.log('useItems useEffect ran')
  }, [])

  return [items, setItems]
}
