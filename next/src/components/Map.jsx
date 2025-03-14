'use client'

/* eslint-disable react/display-name */
import { memo } from 'react'
import styled from 'styled-components'

import { Tile } from './Tile'

const TILE_SIZE = 64
const WALK_ANIMATION_DURATION = 0.45 // in seconds
const WALK_ANIMATION_STEPS = 3
const ANIMATION_DURATION = `${WALK_ANIMATION_DURATION * WALK_ANIMATION_STEPS}s`

const StyledMapWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(calc(-50% + ${({ $cameraX }) => $cameraX}px), calc(-50% + ${({ $cameraY }) => $cameraY}px));
  transform-origin: center center;
  z-index: 1000;
  /* OSRS-style camera following with subtle lag using cubic-bezier */
  transition: transform ${ANIMATION_DURATION} cubic-bezier(0.23, 1, 0.32, 1);
`

const StyledMap = styled.div`
  display: grid;
  grid-template-rows: repeat(${({ rows }) => rows}, ${TILE_SIZE}px);
  grid-template-columns: repeat(${({ cols }) => cols}, ${TILE_SIZE}px);
  grid-gap: 0;
  transform: rotateX(60deg) rotateZ(45deg);
  width: ${({ rows }) => rows * TILE_SIZE}px;
  height: ${({ cols }) => cols * TILE_SIZE}px;
`

export const Map = memo(
  ({
    map,
    mapWidth,
    mapHeight,
    tileWidth,
    tileHeight,
    tilelayers,
    tilesets,
    getTilesetIndexAtPos,
    players,
    handleWalkEnd,
    handleTileClick,
    playerTextureIndex,
    playerPathIndex,
    playerPath,
    socketId,
    cameraPosition,
  }) => {
    return (
      tilelayers &&
      tilesets && (
        <StyledMapWrapper $cameraX={cameraPosition?.x || 0} $cameraY={cameraPosition?.y || 0}>
          <StyledMap rows={mapWidth} cols={mapHeight}>
            {map &&
              map.map((row, y) =>
                row.map((cell, x) => {
                  // TODO: Store mapTextureIndex in state instead of prop drilling
                  return (
                    <Tile
                      mapTextureIndexes={map[y][x]}
                      key={`${x}:${y}`}
                      x={x}
                      y={y}
                      tileWidth={tileWidth}
                      tileHeight={tileHeight}
                      tilesets={tilesets}
                      tilelayers={tilelayers}
                      getTilesetIndexAtPos={getTilesetIndexAtPos}
                      players={players}
                      playerTextureIndex={playerTextureIndex}
                      handleTileClick={handleTileClick}
                      handleWalkEnd={handleWalkEnd}
                      playerPathIndex={playerPathIndex}
                      playerPath={playerPath}
                      socketId={socketId}
                    />
                  )
                })
              )}
          </StyledMap>
        </StyledMapWrapper>
      )
    )
  }
)
