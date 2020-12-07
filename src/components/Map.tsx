/* eslint-disable react/display-name */
import { memo, useCallback } from 'react';
import styled from 'styled-components';

import { Tile } from './Tile';

const StyledMapWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const StyledMap = styled.div<{ rows: number; cols: number }>`
  display: grid;
  grid-template-rows: repeat(${({ rows }) => rows}, 64px);
  grid-template-columns: repeat(${({ cols }) => cols}, 64px);
  grid-gap: 0;

  transform: rotateX(60deg) rotateZ(45deg);

  width: ${({ rows }) => rows * 64}px;
  height: ${({ cols }) => cols * 64}px;
`;

interface MapProps {
  map: any;
  mapWidth: any;
  mapHeight: any;
  tileWidth: any;
  tileHeight: any;
  tilelayers: any;
  tilesets: any;
  getTilesetIndexAtPos: any;
  players: any;
  handleWalkEnd: any;
  playerTextureIndex: any;
  handleTileClick: any;
  playerPathIndex: any;
  playerPath: any;
}

export const Map: React.FC<MapProps> = memo(
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
            {map.map((row: any[], y: any) =>
              row.map((cell: any, x: any) => {
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
                  />
                );
              })
            )}
          </StyledMap>
        </StyledMapWrapper>
      )
    );
  }
);
