import React, { useState, useEffect } from 'react'
import styled, { keyframes, css } from 'styled-components'

import sprites from '../assets/player.png'

const walkAnimations = {
  SE: keyframes`
  0% {
    left: 0%;
  }
  100% {
    left: 100%;
  }`,
  NE: keyframes`
  0% {
    bottom: 0%;
  }
  100% {
    bottom: 100%;
  }`,
  SW: keyframes`
  0% {
    bottom: 0%;
  }
  100% {
    bottom: -100%;
  }`,
  NW: keyframes`
  0% {
    left: 0%;
  }
  100% {
    left: -100%;
  }`,
}

const StyledPlayer = styled.div`
  width: 43px;
  height: 70px;

  position: absolute;

  ${({ isWalking, walkAnimation }) =>
    isWalking &&
    css`
      animation: ${walkAnimation} 0.7s steps(5);
    `}
`

// TODO: Share styled component with Tile

// Multi-step animation transitions
// https://css-tricks.com/using-multi-step-animations-transitions/
const StyledPlayerTexture = styled.div`
  width: 100%;
  height: 100%;

  z-index: 1000;

  pointer-events: none; /* Hover grid entities, not 96x96 child */

  background: url(${sprites});
  background-position: -${({ texturePos }) => texturePos.xPos}px ${({ texturePos }) => texturePos.yPos}px;
  background-repeat: no-repeat;
  image-rendering: pixelated;
  position: relative;

  top: -50%;
  left: -50%;

  transform: rotateZ(-45deg) rotateY(-60deg) scale(2.9);
`

export const Player = ({
  playerTextureIndex,
  symbol,
  path,
  pos,
  handleWalkEnd,
  pathIndex,
}) => {
  const [texturePos, setTexturePos] = useState(null)
  const [dir, setDir] = useState('SE')

  // Get background position for texture
  useEffect(() => {
    if (playerTextureIndex) {
      // Assume no animation frames
      const playerTexture = playerTextureIndex[dir][0]
      const texturePosUpdate = {
        xPos: playerTexture.xPos,
        yPos: playerTexture.yPos,
      }

      setTexturePos(texturePosUpdate)
    }
  }, [dir, playerTextureIndex, symbol])

  useEffect(() => {
    if (path && pathIndex < path.length - 1) {
      const nextPos = path[pathIndex + 1]
      console.log({ pos, nextPos })
      const xDist = nextPos.x - pos.x
      const yDist = nextPos.y - pos.y
      const dirUpdate =
        xDist > 0
          ? 'SE'
          : xDist < 0
          ? 'NW'
          : yDist > 0
          ? 'SW'
          : yDist < 0
          ? 'NE'
          : dir

      if (dir !== dirUpdate) {
        console.log('dirUpdate', dirUpdate)
        setDir(dirUpdate)
      }
    }
  }, [dir, path, pathIndex, pos, pos.x, pos.y])

  return (
    <StyledPlayer
      isWalking={path && pathIndex < path.length - 1}
      walkAnimation={walkAnimations[dir]}
      onAnimationEnd={handleWalkEnd}
    >
      {texturePos && <StyledPlayerTexture texturePos={texturePos} />}
    </StyledPlayer>
  )
}
