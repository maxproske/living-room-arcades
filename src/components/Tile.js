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
`

const StyledTileTexture = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;

  pointer-events: none; /* Hover grid entities, not 96x96 child */

  background: url(${tiles});
  background-position: -${({ texturePos }) => texturePos.xPos}px ${({ texturePos }) => texturePos.yPos}px;
  background-repeat: no-repeat;
  image-rendering: pixelated;
  position: relative;
  top: -50%;
  left: -50%;

  z-index: ${({ texturePos }) => texturePos.xPos + texturePos.y + 1};

  transform: rotateZ(-45deg) rotateY(-60deg) scale(2.9);

  ${({ isInPlayerPath }) => isInPlayerPath && `filter: brightness(0.5);`}
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
    playerPath,
    handleWalkEnd,
    playerPathIndex,
  }) => {
    const [texturePos, setTexturePos] = useState(null)
    const [isInPlayerPath, setIsInPlayerPath] = useState(false)

    // Check if tile position is in playerPath array
    useEffect(() => {
      if (playerPath) {
        const inPath = playerPath.some(
          (pos) => pos.x === xPos && pos.y === yPos
        )
        setIsInPlayerPath(inPath)
      }
    }, [playerPath, xPos, yPos])

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
      console.log(`clicked ${xPos},${yPos}`)

      const tile = {
        pos: {
          x: xPos,
          y: yPos,
        },
      }
      handleTileClick(tile)
    }

    // Use z-index to overlap divs correctly in 3d space
    // https://gamedev.stackexchange.com/a/73470
    return (
      <StyledTile depth={xPos + yPos + 1} onClick={handleClick}>
        {players &&
          players.map((symbol) => (
            <Player
              key={symbol}
              pos={{ x: xPos, y: yPos }}
              playerTextureIndex={playerTextureIndex}
              symbol={symbol}
              path={playerPath}
              handleWalkEnd={handleWalkEnd}
              pathIndex={playerPathIndex}
            />
          ))}
        {entities &&
          entities.map((symbol) => (
            <Entity
              key={mapTextureIndex}
              mapTextureIndex={mapTextureIndex}
              symbol={symbol}
            />
          ))}
        {texturePos && (
          <StyledTileTexture
            isInPlayerPath={isInPlayerPath}
            texturePos={texturePos}
          />
        )}
      </StyledTile>
    )
  }
)
