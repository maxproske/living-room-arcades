import React, { useState, useEffect, memo } from 'react'
import styled from 'styled-components'

import tiles from '../assets/basic.png'

const StyledTile = styled.div`
  background-color: rgba(255, 100, 100, 0.5);

  transition: 0.15s;

  &:hover {
    filter: brightness(1.2);
    transition: 0s;
  }
`

const StyledTileTexture = styled.div`
  width: 100%;
  height: 100%;

  pointer-events: none; /* Hover grid items, not 96x96 child */

  background: url(${tiles});
  background-position: -${({ texturePos }) => texturePos.xPos}px ${({ texturePos }) => texturePos.yPos}px;
  background-repeat: no-repeat;
  background-size: 800% 100%;
  image-rendering: pixelated;
  position: relative;
  top: -32px;
  left: -32px;

  transform: rotateZ(-45deg) rotateY(-60deg) scale(3);
`

// Note: memo prevents React from re-rendering tile every frame
export const Tile = memo(({ tileTextures, xPos, yPos }) => {
  const [texturePos, setTexturePos] = useState(null)

  // Get background position for texture
  useEffect(() => {
    if (tileTextures) {
      // Handle blank tiles
      if (tileTextures.length === 0) {
        const texturePosUpdate = {
          xPos: 0,
          yPos: 0,
        }

        setTexturePos(texturePosUpdate)
        return
      }

      // Get random texture variation
      const tileTexture =
        tileTextures[Math.floor(Math.random() * tileTextures.length)]
      const texturePosUpdate = {
        xPos: tileTexture.xPos,
        yPos: tileTexture.yPos,
      }

      setTexturePos(texturePosUpdate)
      return
    }
  }, [tileTextures])

  const handleClick = () => {
    console.log(`clicked a tile at (${xPos},${yPos})`)
  }

  return (
    <StyledTile onClick={handleClick}>
      {texturePos && <StyledTileTexture texturePos={texturePos} />}
    </StyledTile>
  )
})
