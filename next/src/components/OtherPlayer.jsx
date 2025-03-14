import dynamic from 'next/dynamic'
import { useState, useEffect } from 'react'
import styled from 'styled-components'

// Web components cannot be parsed SSR, as the DOM API isn't available
const PlayerWC = dynamic(() => import('~/components/webcomponents/Player'), {
  ssr: false,
})

const StyledPlayer = styled.div`
  width: 43px;
  height: 70px;

  position: absolute;
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
  background-position: -${({ $texturePos }) => $texturePos.xPos}px ${({ $texturePos }) => $texturePos.yPos}px;
  background-repeat: no-repeat;
  image-rendering: pixelated;
  position: relative;

  top: -50%;
  left: -50%;

  transform: rotateZ(-45deg) rotateY(-60deg) scale(2.9);
`

export const OtherPlayer = ({ playerTextureIndex, dir }) => {
  const getTexturePos = () => {
    if (!playerTextureIndex || !dir) return { xPos: 0, yPos: 0 }
    return playerTextureIndex[dir][0]
  }

  return (
    <PlayerWC>
      <StyledPlayer>
        <StyledPlayerTexture $texturePos={getTexturePos()} />
      </StyledPlayer>
    </PlayerWC>
  )
}
