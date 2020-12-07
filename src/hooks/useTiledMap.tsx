import { useState, useEffect, useCallback } from 'react';
import TiledMap, { TiledLayerTilelayer, TiledTileset } from 'tiled-types';

interface Pos {
  x: number;
  y: number;
}

export const useTiledMap = () => {
  const [mapWidth, setMapWidth] = useState<number | null>(null);
  const [mapHeight, setMapHeight] = useState<number | null>(null);
  const [tileWidth, setTileWidth] = useState<number | null>(null);
  const [tileHeight, setTileHeight] = useState<number | null>(null);
  const [tilelayers, setTilelayers] = useState<TiledLayerTilelayer[] | null>(
    null
  );
  const [tilesets, setTilesets] = useState<TiledTileset[] | null>(null);

  const getTilesetIndexAtPos = (
    layer: TiledLayerTilelayer,
    pos: Pos
  ): number => {
    const { data, width } = layer;
    const { x, y } = pos;
    const index = x + y * width;
    const tilesetIndex = data[index];

    return tilesetIndex;
  };

  // Initialize Tiled map
  useEffect(() => {
    const loadMapFile = async () => {
      try {
        const schema: TiledMap = await fetch(
          '/maps/map.json'
        ).then((response) => response.json());

        setMapWidth(schema.width);
        setMapHeight(schema.height);
        setTileWidth(schema.tilewidth);
        setTileHeight(schema.tileheight);
        // Filter object, image, and group layers to satisfy type
        // Reverse layer order to make entities come first
        const tilelayersUpdate: TiledLayerTilelayer[] = schema.layers
          .filter(
            (layer): layer is TiledLayerTilelayer => layer.type === 'tilelayer'
          )
          .reverse();
        setTilelayers(tilelayersUpdate);
        setTilesets(schema.tilesets);
      } catch (err) {
        console.error(err);
      }
    };

    loadMapFile();
  }, []);

  return {
    mapWidth,
    mapHeight,
    tileWidth,
    tileHeight,
    tilelayers,
    tilesets,
    getTilesetIndexAtPos,
  };
};
