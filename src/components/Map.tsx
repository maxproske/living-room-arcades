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
  mapWidth: any;
  mapHeight: any;
  tileWidth: any;
  tileHeight: any;
  tilelayers: any;
  tilesets: any;
  getTilesetIndexAtPos: any;
}

export const Map: React.FC<MapProps> = memo(
  ({
    mapWidth,
    mapHeight,
    tileWidth,
    tileHeight,
    tilelayers,
    tilesets,
    getTilesetIndexAtPos,
  }) => {
    const renderTiles = useCallback(() => {
      const tiles = [];
      for (let y = 0; y < mapHeight; y++) {
        for (let x = 0; x < mapWidth; x++) {
          tiles.push(
            <Tile
              key={`${x}:${y}`}
              x={x}
              y={y}
              tileWidth={tileWidth}
              tileHeight={tileHeight}
              tilesets={tilesets}
              tilelayers={tilelayers}
              getTilesetIndexAtPos={getTilesetIndexAtPos}
            />
          );
        }
      }

      return tiles;
    }, [tilelayers, tilesets]);

    return (
      tilelayers &&
      tilesets && (
        <StyledMapWrapper>
          <StyledMap rows={mapWidth} cols={mapHeight}>
            {renderTiles()}
          </StyledMap>
        </StyledMapWrapper>
      )
    );
  }
);
