import React, { memo } from 'react'
import styled from 'styled-components'

import { Tile } from './Tile'

const StyledMapWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const StyledMap = styled.div`
  display: grid;
  grid-template-rows: repeat(${({ rows }) => rows}, 64px);
  grid-template-columns: repeat(${({ cols }) => cols}, 64px);
  grid-gap: 0;

  transform: rotateX(60deg) rotateZ(45deg);

  width: ${({ rows }) => rows * 64}px;
  height: ${({ cols }) => cols * 64}px;
`

export const Map = ({ map }) => {
  return (
    map && (
      <StyledMapWrapper>
        <StyledMap rows={map.length} cols={map[0].length}>
          {map.map((row, y) =>
            row.map((tile, x) => <Tile xPos={x} yPos={y} key={`${x},${y}`} />)
          )}
        </StyledMap>
      </StyledMapWrapper>
    )
  )
}
