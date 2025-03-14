import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

// Components
import { Map } from './Map'
import { ContextMenu } from '~/components/ContextMenu'
import { Chat } from '~/components/Chat'

// Custom hooks
import { useInterval } from '../hooks/useInterval'
import { useGameStatus } from '../hooks/useGameStatus'
import { usePlayer } from '../hooks/usePlayer'
import { useTiledMap } from '~/hooks/useTiledMap'
import { useSocket } from '~/hooks/useSocket'
import { useCamera } from '~/hooks/useCamera'

const StyledGameWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
`

export const Game = () => {
  const gameRef = useRef(null)
  const [map, setMap] = useState(null)
  const { socketId, messages, emitMessage, emitPlayerPos } = useSocket()

  const { mapWidth, mapHeight, tileWidth, tileHeight, tilelayers, tilesets, getTilesetIndexAtPos } = useTiledMap()
  const [frames, tick] = useGameStatus()
  const { player, setPlayer, playerTextureIndex, handleTileClick, handleWalkEnd, playerPathIndex, playerPath } =
    usePlayer({
      map,
      emitPlayerPos,
    })

  const cameraPosition = useCamera(player?.pos)

  const handleKeyDown = ({ keyCode }) => {}

  const handleKeyUp = ({ keyCode }) => {}

  // Game loop
  useInterval(() => {
    tick()
  }, 1000)

  console.log('Rendered Game')

  useEffect(() => {
    if (!mapHeight) {
      return
    }

    if (!mapWidth) {
      return
    }

    if (!tilelayers) {
      return
    }

    if (!player) {
      return
    }

    // Add default and obstacle tiles to map
    const mapUpdate = []
    for (let y = 0; y < mapHeight; y++) {
      mapUpdate[y] = []
      for (let x = 0; x < mapWidth; x++) {
        const pos = { x, y }
        mapUpdate[y][x] = {
          walkable: getTilesetIndexAtPos(tilelayers[1], pos),
          obstacles: getTilesetIndexAtPos(tilelayers[0], pos),
          players: [],
        }
      }
    }

    // Add player to map
    mapUpdate[player.pos.y][player.pos.x].players.push(player)

    setMap(mapUpdate)
  }, [mapHeight, mapWidth, tilelayers, player])

  // Note: Without the role attribute, you would have to click the map for inputs to register
  return (
    <StyledGameWrapper ref={gameRef} role="button" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp} id="game">
      <Map
        map={map}
        mapWidth={mapWidth}
        mapHeight={mapHeight}
        tileWidth={tileWidth}
        tileHeight={tileHeight}
        tilelayers={tilelayers}
        tilesets={tilesets}
        getTilesetIndexAtPos={getTilesetIndexAtPos}
        players={[player]}
        playerTextureIndex={playerTextureIndex}
        handleTileClick={handleTileClick}
        handleWalkEnd={handleWalkEnd}
        playerPathIndex={playerPathIndex}
        playerPath={playerPath}
        socketId={socketId}
        cameraPosition={cameraPosition}
      />
      {/* <ContextMenu outerRef={gameRef} /> */}
      <Chat socketId={socketId} messages={messages} emitMessage={emitMessage} />
    </StyledGameWrapper>
  )
}
