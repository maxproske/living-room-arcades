import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

// Components
import { Map } from './Map'

// Custom hooks
import { useInterval } from '../hooks/useInterval'
import { useItems } from '../hooks/useItems'
import { useMap } from '../hooks/useMap'
import { useGameStatus } from '../hooks/useGameStatus'

// Placeholder level
import file from '../maps/level1.txt'

const StyledGameWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  overflow: hidden;
`

export const Game = () => {
  const [frames, tick] = useGameStatus()
  const [items, setItems] = useItems()
  const [map, setMap] = useMap(file, items)

  const handleKeyDown = () => {}

  const handleKeyUp = () => {}

  // Game loop
  useInterval(() => {
    tick()
  }, 100)

  console.log(`rendering frame ${frames}`)

  // Note: Without the role attribute, you would have to click the map for inputs to register
  return (
    <StyledGameWrapper
      role="button"
      tabIndex="0"
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      <Map map={map} />
    </StyledGameWrapper>
  )
}
