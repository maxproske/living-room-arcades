import React from 'react'
import styled from 'styled-components'

// Components
import { Map } from './Map'

// Custom hooks
import { useInterval } from '../hooks/useInterval'
import { useEntities } from '../hooks/useEntities'
import { useMap } from '../hooks/useMap'
import { useGameStatus } from '../hooks/useGameStatus'

// Placeholder level
import level1 from '../maps/level1.txt'
import level1Entities from '../maps/entities.json'
import level1TextureIndex from '../assets/basic-index.txt'

const StyledGameWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

export const Game = () => {
  const [frames, tick] = useGameStatus()
  const [entities, setEntities] = useEntities(level1Entities)
  const [map, setMap, textureIndex] = useMap(
    level1,
    level1TextureIndex,
    entities
  )

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
      <Map map={map} textureIndex={textureIndex} />
    </StyledGameWrapper>
  )
}
