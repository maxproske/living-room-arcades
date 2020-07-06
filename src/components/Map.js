import React from 'react'
import styled from 'styled-components'

import { Tile } from './Tile'

const StyledMap = styled.div`
  display: grid;
  grid-template-rows: repeat(8, 64px);
  grid-template-columns: repeat(8, 64px);

  transform: rotateX(60deg) rotateY(0deg) rotateZ(-45deg);
`

export const Map = ({ map }) => {
  return (
    <StyledMap>
      {map.map((row) => row.map((tile, i) => <Tile key={i} />))}
    </StyledMap>
  )
}
