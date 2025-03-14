'use client'

import { memo } from 'react'
import styled, { css } from 'styled-components'

// Components
import { Entity } from './Entity'
import { Player } from './Player'
import { OtherPlayer } from './OtherPlayer'

// Stores
import { useMultiplayerStore } from '~/stores/MultiplayerProvider'

const StyledTile = styled.div`
  background-color: rgba(255, 100, 100, 0);

  transition: 0.15s;
  position: relative; /* Allow entities and textures to stack */

  ${({ $isWalkable }) =>
    $isWalkable &&
    css`
      &:hover {
        filter: brightness(1.2);
        transition: 0s;
      }
    `}
`

const StyledTileTexture = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;

  pointer-events: none; /* Hover grid entities, not 96x96 child */

  background: url(${({ $tileset }) => $tileset});
  background-position: -${({ $texturePos }) => $texturePos.x}px ${({ $texturePos }) => $texturePos.y}px;
  background-repeat: no-repeat;
  image-rendering: pixelated;
  position: relative;
  top: -50%;
  left: -50%;

  transform: rotateZ(-45deg) rotateY(-60deg) scale(2.9);

  ${({ $isInPlayerPath }) => $isInPlayerPath && `filter: brightness(0.5);`}
`

/* eslint-disable react/display-name */

// Note: memo prevents React from re-rendering tile every frame
export const Tile = memo(
  ({
    x,
    y,
    tileWidth,
    tileHeight,
    tilelayers,
    tilesets,
    players,
    playerTextureIndex,
    handleTileClick,
    mapTextureIndexes,
    handleWalkEnd,
    playerPathIndex,
    playerPath,
    socketId,
  }) => {
    const { allPlayerPos } = useMultiplayerStore()

    const handleClick = () => {
      console.log(`clicked ${x}:${y}`)

      const tileClicked = {
        pos: {
          x,
          y,
        },
      }
      handleTileClick(tileClicked)
    }

    const renderPlayers = () => {
      return players.map((player) => {
        const { pos } = player
        const { x: playerXPos, y: playerYPos } = pos
        if (x === playerXPos && y === playerYPos) {
          return (
            <Player
              key={`[player][${x},${y}]`}
              pos={pos}
              handleWalkEnd={handleWalkEnd}
              playerPathIndex={playerPathIndex}
              playerTextureIndex={playerTextureIndex}
              playerPath={playerPath}
            />
          )
        }
      })
    }

    const renderOtherPlayers = () => {
      return Object.keys(allPlayerPos).map((playerSocketId) => {
        const { pos, dir } = allPlayerPos[playerSocketId]
        const { x: playerXPos, y: playerYPos } = pos

        // Don't render self as an other player
        if (playerSocketId !== socketId && x === playerXPos && y === playerYPos) {
          return (
            <OtherPlayer
              key={`[otherPlayer][${playerSocketId}][${x},${y}]`}
              playerTextureIndex={playerTextureIndex}
              dir={dir}
            />
          )
        }
      })
    }

    const renderTiles = () => {
      if (!mapTextureIndexes) {
        return null
      }

      const { walkable, obstacles, players } = mapTextureIndexes

      const tileset = tilesets[0].image
      const tiles = []

      if (obstacles) {
        const texturePos = {
          x: (obstacles - 1) * tileWidth,
          y: 0,
        }

        tiles.push(<Entity key={`[obstacle][${x},${y}]`} tileset={tileset} texturePos={texturePos} />)
      }

      if (walkable) {
        const texturePos = {
          x: (walkable - 1) * tileWidth,
          y: 0,
        }

        tiles.push(
          <StyledTileTexture
            key={`[walkable][${x},${y}]`}
            $isInPlayerPath={false}
            $tileset={tileset}
            $texturePos={texturePos}
          />
        )
      }

      return tiles
    }

    // Use z-index to overlap divs correctly in 3d space
    // https://gamedev.stackexchange.com/a/73470
    return (
      <StyledTile
        key={`[tile][${x},${y}]`}
        depth={x + y + 1}
        onClick={handleClick}
        $isWalkable={mapTextureIndexes.obstacles === 0}
      >
        {renderPlayers()}
        {renderOtherPlayers()}
        {renderTiles()}
      </StyledTile>
    )
  }
)
