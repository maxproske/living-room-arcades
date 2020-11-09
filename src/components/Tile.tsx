import { useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import { TiledLayerTilelayer, TiledTileset } from 'tiled-types';

// Components
import { Entity } from './Entity';
import { Player } from './Player';

import { Pos } from '~/types';

const StyledTile = styled.div<{ depth: number }>`
  background-color: rgba(255, 100, 100, 0);

  transition: 0.15s;
  position: relative; /* Allow entities and textures to stack */

  &:hover {
    filter: brightness(1.2);
    transition: 0s;
  }
`;

const StyledTileTexture = styled.div<{
  isInPlayerPath: boolean;
  tileset: string;
  texturePos: any;
}>`
  width: 100%;
  height: 100%;
  position: absolute;

  pointer-events: none; /* Hover grid entities, not 96x96 child */

  background: url(${({ tileset }) => tileset});
  background-position: -${({ texturePos }) => texturePos.x}px ${({ texturePos }) => texturePos.y}px;
  background-repeat: no-repeat;
  image-rendering: pixelated;
  position: relative;
  top: -50%;
  left: -50%;

  transform: rotateZ(-45deg) rotateY(-60deg) scale(2.9);

  ${({ isInPlayerPath }) => isInPlayerPath && `filter: brightness(0.5);`}
`;

/* eslint-disable react/display-name */

// Note: memo prevents React from re-rendering tile every frame
export const Tile: React.FC<any> = memo(
  ({
    x,
    y,
    tileWidth,
    tileHeight,
    tilelayers,
    tilesets,
    getTilesetIndexAtPos,
  }) => {
    // const [texturePos, setTexturePos] = useState<Pos | null>(null);
    // const [isInPlayerPath, setIsInPlayerPath] = useState(false);

    // // Check if tile position is in playerPath array
    // useEffect(() => {
    //   if (playerPath) {
    //     const inPath = playerPath.some(
    //       (pos: any) => pos.x === xPos && pos.y === yPos
    //     );
    //     setIsInPlayerPath(inPath);
    //   }
    // }, [playerPath, xPos, yPos]);

    // useEffect(() => {
    //   if (entities && entities.length > 0) {
    //     console.log(`found entities at (${xPos},${yPos})`);
    //   }
    // }, [entities, xPos, yPos]);

    // // Get background position for texture
    // useEffect(() => {
    //   if (mapTextureIndex[symbol]) {
    //     // Handle blank tiles
    //     if (mapTextureIndex[symbol].length === 0) {
    //       const texturePosUpdate: Pos = {
    //         xPos: 0,
    //         yPos: 0,
    //       };

    //       setTexturePos(texturePosUpdate);
    //       return;
    //     }

    //     // Get random texture variation
    //     const tileTexture =
    //       mapTextureIndex[symbol][
    //         Math.floor(Math.random() * mapTextureIndex[symbol].length)
    //       ];
    //     const texturePosUpdate = {
    //       xPos: tileTexture.xPos,
    //       yPos: tileTexture.yPos,
    //     };

    //     setTexturePos(texturePosUpdate);
    //     return;
    //   }
    // }, [symbol, mapTextureIndex]);

    // const handleClick = () => {
    //   console.log(`clicked ${xPos},${yPos}`);

    //   const tile = {
    //     pos: {
    //       x: xPos,
    //       y: yPos,
    //     },
    //   };
    //   handleTileClick(tile);
    // };

    const handleClick = () => {
      console.log(`clicked ${x}:${y}`);
    };

    // Use z-index to overlap divs correctly in 3d space
    // https://gamedev.stackexchange.com/a/73470
    return (
      <StyledTile depth={x + y + 1} onClick={handleClick}>
        {/* {players &&
          players.map((symbol: string) => (
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
          entities.map((symbol: string) => (
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
        )} */}
        {tilelayers.map((layer: TiledLayerTilelayer) => {
          const { data, width, name } = layer;
          const index = x + y * width;
          const tilesetIndex = data[index] - 1;
          const texturePos = {
            x: tilesetIndex * tileWidth,
            y: 0,
          };
          const tileset = tilesets[0].image;

          switch (name) {
            case 'default':
              return (
                <StyledTileTexture
                  key={`${name}[${tilesetIndex}]`}
                  isInPlayerPath={false}
                  tileset={tileset}
                  texturePos={texturePos}
                />
              );
            case 'obstacles':
              return (
                <Entity
                  key={`${name}[${tilesetIndex}]`}
                  tileset={tileset}
                  texturePos={texturePos}
                />
              );
            default:
              console.error(`Unsupported tileset name: ${name}`);
              break;
          }
        })}
      </StyledTile>
    );
  }
);
