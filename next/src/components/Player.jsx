import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { useUser } from '../stores/UserProvider'

import { updateDir } from '../stores/userActions'

// Web components cannot be parsed SSR, as the DOM API isn't available
const PlayerWC = dynamic(() => import('~/components/webcomponents/Player'), {
  ssr: false,
})

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
      animation: ${walkAnimation} 0.45s steps(3);
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

  background: url('/assets/player.png');
  background-position: -${({ texturePos }) => texturePos.xPos}px ${({ texturePos }) => texturePos.yPos}px;
  background-repeat: no-repeat;
  image-rendering: pixelated;
  position: relative;

  top: -50%;
  left: -50%;

  transform: rotateZ(-45deg) rotateY(-60deg) scale(2.9);
`

export const Player = ({ pos, handleWalkEnd, playerPathIndex, playerTextureIndex, playerPath }) => {
  const { state, dispatch } = useUser()
  const [texturePos, setTexturePos] = useState(null)

  // Get background position for texture
  useEffect(() => {
    if (playerTextureIndex && state.dir) {
      // Assume no animation frames
      const playerTexture = playerTextureIndex[state.dir][0]
      const texturePosUpdate = {
        xPos: playerTexture.xPos,
        yPos: playerTexture.yPos,
      }

      setTexturePos(texturePosUpdate)
    }
  }, [state.dir, playerTextureIndex])

  useEffect(() => {
    if (playerPath && playerPathIndex < playerPath.length - 1) {
      const nextPos = playerPath[playerPathIndex + 1]

      const xDist = nextPos.x - pos.x
      const yDist = nextPos.y - pos.y
      const dirUpdate = xDist > 0 ? 'SE' : xDist < 0 ? 'NW' : yDist > 0 ? 'SW' : yDist < 0 ? 'NE' : state.dir

      if (state.dir !== dirUpdate) {
        dispatch(updateDir(dirUpdate))
      }
    }
  }, [dispatch, playerPath, playerPathIndex, pos, state.dir])

  return (
    <PlayerWC>
      <StyledPlayer
        isWalking={playerPath && playerPathIndex < playerPath.length - 1}
        walkAnimation={walkAnimations[state.dir]}
        onAnimationEnd={handleWalkEnd}
      >
        {state.dir && texturePos && <StyledPlayerTexture texturePos={texturePos} />}
      </StyledPlayer>
    </PlayerWC>
  )
}
