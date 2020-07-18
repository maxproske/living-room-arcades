import React, { useState, useEffect, memo } from 'react'
import styled from 'styled-components'

// Components
import { Entity } from './Entity'
import { Player } from './Player'

import tiles from '../assets/basic.png'

const StyledTile = styled.div`
  background-color: rgba(255, 100, 100, 0);

  transition: 0.15s;
  position: relative; /* Allow entities and textures to stack */

  &:hover {
    filter: brightness(1.2);
    transition: 0s;
  }

  z-index: ${({ depth }) => depth};
`

const StyledTileTexture = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;

  z-index: 1;

  pointer-events: none; /* Hover grid entities, not 96x96 child */

  background: url(${tiles});
  background-position: -${({ texturePos }) => texturePos.xPos}px ${({ texturePos }) => texturePos.yPos}px;
  background-repeat: no-repeat;
  background-size: 1000% 100%;
  image-rendering: pixelated;
  position: relative;
  top: -32px;
  left: -32px;

  z-index: ${({ texturePos }) => texturePos.xPos + texturePos.y + 1};

  transform: rotateZ(-45deg) rotateY(-60deg) scale(3);
`

// Note: memo prevents React from re-rendering tile every frame
export const Tile = memo(
  ({
    mapTextureIndex,
    playerTextureIndex,
    symbol,
    entities,
    players,
    xPos,
    yPos,
    handleTileClick,
  }) => {
    const [texturePos, setTexturePos] = useState(null)

    useEffect(() => {
      if (entities && entities.length > 0) {
        console.log(`found entities at (${xPos},${yPos})`)
      }
    }, [entities, xPos, yPos])

    // Get background position for texture
    useEffect(() => {
      if (mapTextureIndex[symbol]) {
        // Handle blank tiles
        if (mapTextureIndex[symbol].length === 0) {
          const texturePosUpdate = {
            xPos: 0,
            yPos: 0,
          }

          setTexturePos(texturePosUpdate)
          return
        }

        // Get random texture variation
        const tileTexture =
          mapTextureIndex[symbol][
            Math.floor(Math.random() * mapTextureIndex[symbol].length)
          ]
        const texturePosUpdate = {
          xPos: tileTexture.xPos,
          yPos: tileTexture.yPos,
        }

        setTexturePos(texturePosUpdate)
        return
      }
    }, [symbol, mapTextureIndex])

    const handleClick = () => {
      console.log(`clicked a tile at (${xPos},${yPos})`)

      handleTileClick(xPos, yPos)
    }

    // Use z-index to overlap divs correctly in 3d space
    // https://gamedev.stackexchange.com/a/73470
    return (
      <StyledTile depth={xPos + yPos + 1} onClick={handleClick}>
        {players &&
          players.map((symbol) => (
            <Player playerTextureIndex={playerTextureIndex} symbol={symbol} />
          ))}
        {entities &&
          entities.map((symbol) => (
            <Entity mapTextureIndex={mapTextureIndex} symbol={symbol} />
          ))}
        {texturePos && <StyledTileTexture texturePos={texturePos} />}
      </StyledTile>
    )
  }
)
