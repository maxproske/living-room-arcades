import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import sprites from '../assets/player.png'

const StyledPlayer = styled.div`
  width: 43px;
  height: 70px;

  position: absolute;
`

// TODO: Share styled component with Tile
const StyledPlayerTexture = styled.div`
  width: 100%;
  height: 100%;

  z-index: 3;

  pointer-events: none; /* Hover grid entities, not 96x96 child */

  background: url(${sprites});
  background-position: -${({ texturePos }) => texturePos.xPos}px ${({ texturePos }) => texturePos.yPos}px;
  background-repeat: no-repeat;
  background-size: 400% 100%;
  image-rendering: pixelated;
  position: relative;

  top: -50%;
  left: -50%;

  transform: rotateZ(-45deg) rotateY(-60deg) scale(3);
`

export const Player = ({ playerTextureIndex, symbol }) => {
  const [texturePos, setTexturePos] = useState(null)

  console.log('playerTextureIndex', playerTextureIndex)

  // Get background position for texture
  useEffect(() => {
    if (playerTextureIndex) {
      // Assume no animation frames
      const playerTexture = playerTextureIndex['r'][0]
      const texturePosUpdate = {
        xPos: playerTexture.xPos,
        yPos: playerTexture.yPos,
      }

      setTexturePos(texturePosUpdate)
    }
  }, [playerTextureIndex, symbol])

  return (
    <StyledPlayer>
      {texturePos && <StyledPlayerTexture texturePos={texturePos} />}
    </StyledPlayer>
  )
}
