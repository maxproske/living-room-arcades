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

export const Map = memo(({ map, textureIndex }) => {
  return (
    map &&
    textureIndex && (
      <StyledMapWrapper>
        <StyledMap rows={map.length} cols={map[0].length}>
          {map.map((row, y) =>
            row.map((tile, x) => {
              console.log(
                'textureIndex[tile.symbol]',
                textureIndex[tile.symbol]
              )

              // TODO: Store textureIndex in state instead of prop drilling
              return (
                <Tile
                  textureIndex={textureIndex}
                  symbol={tile.symbol}
                  entities={tile.entities}
                  xPos={x}
                  yPos={y}
                  key={`${x},${y}`}
                />
              )
            })
          )}
        </StyledMap>
      </StyledMapWrapper>
    )
  )
})
