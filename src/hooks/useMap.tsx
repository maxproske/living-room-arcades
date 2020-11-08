import { useState, useEffect, useCallback } from 'react';

import { createMap, createTextureIndex } from '../utils/gameHelpers';
import { findPath } from '../utils/pathing';

export const useMap = (
  mapFile: any,
  texturesFile: any,
  entities: any,
  player: any,
  setPlayer: any
) => {
  const [map, setMap] = useState<any>(null);
  const [textureIndex, setTextureIndex] = useState<any>(null);
  const [playerPath, setPlayerPath] = useState<any>(null);
  const [isWalking, setIsWalking] = useState<any>(false);
  const [playerPathIndex, setPlayerPathIndex] = useState<any>(null);

  // Initialize map
  useEffect(() => {
    const fetchMap = async () => {
      const mapUpdate = await createMap(mapFile, entities, player);
      setMap(mapUpdate);
    };

    const fetchTextureIndex = async () => {
      const textureIndexUpdate = await createTextureIndex(texturesFile);
      setTextureIndex(textureIndexUpdate);
    };

    if (mapFile && entities && player && !map) {
      fetchMap();
      fetchTextureIndex();
    }
  }, [entities, map, mapFile, player, texturesFile]);

  // Invoke useCallback to prevent extra rerenders
  const handleTileClick = useCallback(
    (tile) => {
      const startPos = {
        x: player.pos.x,
        y: player.pos.y,
      };
      const endPos = {
        x: tile.pos.x,
        y: tile.pos.y,
      };
      const playerPathUpdate = findPath(map, startPos, endPos);
      setPlayerPath(playerPathUpdate);
      setPlayerPathIndex(0);
      setIsWalking(true);
    },
    [map, player]
  );

  const handleWalkEnd = useCallback(() => {
    if (playerPathIndex < playerPath.length) {
      const playerPathIndexUpdate = playerPathIndex + 1;
      const nextPos = playerPath[playerPathIndexUpdate];

      // This is disgusting
      if (nextPos) {
        const mapUpdate = map;
        mapUpdate[player.pos.y][player.pos.x].players = [];
        mapUpdate[nextPos.y][nextPos.x].players = [
          {
            symbol: 'p',
            pos: {
              x: nextPos.x,
              y: nextPos.y,
            },
          },
        ];
        setIsWalking(false);
        setPlayerPathIndex(playerPathIndexUpdate);
        setPlayer({
          ...player,
          pos: nextPos,
        });
        setMap(mapUpdate);
      }
    }
  }, [map, playerPathIndex, player, playerPath, setPlayer]);

  return [
    map,
    setMap,
    textureIndex,
    handleTileClick,
    playerPath,
    handleWalkEnd,
    playerPathIndex,
  ];
};
