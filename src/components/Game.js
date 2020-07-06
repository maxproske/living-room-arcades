import React from 'react'
import styled from 'styled-components'

// Components
import { Map } from './Map'

// Custom hooks
import { useMap } from '../hooks/useMap'

const StyledGameWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: black;
  overflow: hidden;
`

export const Game = () => {
  const [map, setMap] = useMap()

  const handleKeyDown = () => {}

  const handleKeyUp = () => {}

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
