import React from 'react'
import styled from 'styled-components'

import tiles from '../assets/tiles.png'

const StyledTileWrapper = styled.div`
  background-color: rgba(255, 100, 100, 0.5);

  transition: 0.25s;

  &:hover {
    filter: brightness(1.2);
    transition: 0s;
  }
`

const StyledTile = styled.div`
  width: 100%;
  height: 100%;

  pointer-events: none; /* Hover grid items, not 96x96 child */

  background: url(${tiles});
  background-position: calc(${({ atlasIndex }) => atlasIndex * 64 * -1}px) -16px;
  background-repeat: no-repeat;
  background-size: 300% 100%;
  image-rendering: pixelated;

  transform: rotateZ(-45deg) rotateY(-60deg) scale(3);
`

export const Tile = () => {
  return (
    <StyledTileWrapper>
      <StyledTile atlasIndex={Math.floor(Math.random() * 3)} />
    </StyledTileWrapper>
  )
}
