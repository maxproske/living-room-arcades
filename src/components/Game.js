import React from 'react'
import styled from 'styled-components'

// Components
import { Map } from './Map'

// Custom hooks
import { useInterval } from '../hooks/useInterval'
import { useEntities } from '../hooks/useEntities'
import { useMap } from '../hooks/useMap'
import { useGameStatus } from '../hooks/useGameStatus'
import { usePlayer } from '../hooks/usePlayer'

// Placeholder level
import level1 from '../maps/level1.txt'
import level1Entities from '../maps/entities.json'
import level1TextureFile from '../assets/basic-index.txt'

// Placeholder player
import playerTextureFile from '../assets/player-index.txt'

const StyledGameWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`

export const Game = () => {
  const [frames, tick] = useGameStatus()
  const [entities, setEntities] = useEntities(level1Entities)
  const [player, setPlayer, playerTextureIndex] = usePlayer(playerTextureFile)
  const [map, setMap, mapTextureIndex, handleTileClick, playerPath] = useMap(
    level1,
    level1TextureFile,
    entities,
    player
  )

  const handleKeyDown = ({ keyCode }) => {
    console.log(`keyCode ${keyCode} down`)
  }

  const handleKeyUp = ({ keyCode }) => {
    console.log(`keyCode ${keyCode} up`)
  }

  // Game loop
  useInterval(() => {
    tick()
  }, 1000)

  console.log(`Frame ${frames}`)

  // Note: Without the role attribute, you would have to click the map for inputs to register
  return (
    <StyledGameWrapper
      role="button"
      tabIndex="0"
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      <Map
        map={map}
        mapTextureIndex={mapTextureIndex}
        playerTextureIndex={playerTextureIndex}
        handleTileClick={handleTileClick}
        playerPath={playerPath}
      />
    </StyledGameWrapper>
  )
}
