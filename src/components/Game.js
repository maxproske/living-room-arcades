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

  return (
    <StyledGameWrapper>
      <Map map={map} />
    </StyledGameWrapper>
  )
}
