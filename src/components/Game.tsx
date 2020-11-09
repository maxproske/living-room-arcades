import React, { useCallback } from 'react';
import styled from 'styled-components';

// Components
import { Map } from './Map';

// Custom hooks
import { useInterval } from '../hooks/useInterval';
import { useEntities } from '../hooks/useEntities';
import { useMap } from '../hooks/useMap';
import { useGameStatus } from '../hooks/useGameStatus';
import { usePlayer } from '../hooks/usePlayer';
import { useTiledMap } from '~/hooks/useTiledMap';

// Placeholder level
const level1 = '/maps/level1.txt';
const level1Entities = '/maps/entities.json';
const level1TextureFile = '/assets/basic-index.txt';

// Placeholder player
const playerTextureFile = '/assets/player-index.txt';

const StyledGameWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
`;

export const Game: React.FC = () => {
  const {
    mapWidth,
    mapHeight,
    tileWidth,
    tileHeight,
    tilelayers,
    tilesets,
    getTilesetIndexAtPos,
  } = useTiledMap();
  const [frames, tick] = useGameStatus();
  const [entities, setEntities] = useEntities(level1Entities);
  const [player, setPlayer, playerTextureIndex] = usePlayer(playerTextureFile);
  // const [
  //   map,
  //   setMap,
  //   mapTextureIndex,
  //   handleTileClick,
  //   playerPath,
  //   handleWalkEnd,
  //   playerPathIndex,
  // ] = useMap(level1, level1TextureFile, entities, player, setPlayer);

  const handleKeyDown = ({ keyCode }: any) => {
    console.log(`keyCode ${keyCode} down`);
  };

  const handleKeyUp = ({ keyCode }: any) => {
    console.log(`keyCode ${keyCode} up`);
  };

  // Game loop
  useInterval(() => {
    tick();
  }, 1000);

  console.log('Rendered Game');

  // Note: Without the role attribute, you would have to click the map for inputs to register
  return (
    <StyledGameWrapper
      role="button"
      onKeyDown={handleKeyDown}
      onKeyUp={handleKeyUp}
    >
      <Map
        mapWidth={mapWidth}
        mapHeight={mapHeight}
        tileWidth={tileWidth}
        tileHeight={tileHeight}
        tilelayers={tilelayers}
        tilesets={tilesets}
        getTilesetIndexAtPos={getTilesetIndexAtPos}
        // playerTextureIndex={playerTextureIndex}
        // map={map}
        // mapTextureIndex={mapTextureIndex}
        // handleTileClick={handleTileClick}
        // playerPath={playerPath}
        // handleWalkEnd={handleWalkEnd}
        // playerPathIndex={playerPathIndex}
      />
    </StyledGameWrapper>
  );
};
