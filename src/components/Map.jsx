/* eslint-disable react/display-name */
import { memo } from 'react'
import styled from 'styled-components'

import { Tile } from './Tile'

const StyledMapWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`

const StyledMap = styled.div`
  display: grid;
  grid-template-rows: repeat(${({ rows }) => rows}, 64px);
  grid-template-columns: repeat(${({ cols }) => cols}, 64px);
  grid-gap: 0;

  transform: rotateX(60deg) rotateZ(45deg);

  width: ${({ rows }) => rows * 64}px;
  height: ${({ cols }) => cols * 64}px;
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
  }) => {
    // const renderTiles = useCallback(() => {
    //   map.map((row: any[], y: any) =>
    //           row.map(
    //             (
    //               tile: { symbol: any; entities: any; players: any },
    //               x: any
    //             ) => {
    //               // TODO: Store mapTextureIndex in state instead of prop drilling
    //               return (
    //         <Tile
    //           mapTextureIndexes={map[y][x]}
    //           key={`${x}:${y}`}
    //           x={x}
    //           y={y}
    //           tileWidth={tileWidth}
    //           tileHeight={tileHeight}
    //           tilesets={tilesets}
    //           tilelayers={tilelayers}
    //           getTilesetIndexAtPos={getTilesetIndexAtPos}
    //           players={players}
    //           playerTextureIndex={playerTextureIndex}
    //           handleTileClick={handleTileClick}
    //         />
    //       );
    //     }
    //   }

    //   return tiles;
    // }, [tilelayers, tilesets, players, playerTextureIndex, map]);

    return (
      tilelayers &&
      tilesets && (
        <StyledMapWrapper>
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
