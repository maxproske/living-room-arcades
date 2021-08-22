import { useState, useEffect } from 'react';
import { LobbyClient } from 'boardgame.io/client';
import { v4 as uuidv4 } from 'uuid';

// Components
import { GameClient } from '~/components/GameClient';

export const App: React.FC = () => {
  const [playerID, setPlayerID] = useState<string | null>(null);
  const [matchID, setMatchID] = useState<string | null>(null);
  const [credentials, setCredentials] = useState<string | null>(null);

  useEffect(() => {
    const getGames = async () => {
      const lobbyClient = new LobbyClient({
        server: 'http://localhost:8000',
      });
      // const games = await lobbyClient.listGames();
      // console.log({ games });

      const gameName = 'living-room-arcades';
      const matchIDUpdate = 'default';
      const match = await lobbyClient.getMatch(gameName, matchIDUpdate);
      console.log({ match });

      const playerIDUpdate = uuidv4();
      const playerName = 'Player';

      const {
        playerCredentials: credentialsUpdate,
      } = await lobbyClient.joinMatch(gameName, matchIDUpdate, {
        playerID: playerIDUpdate,
        playerName,
      });

      console.log({ playerIDUpdate, playerName, credentialsUpdate });
      setPlayerID(playerIDUpdate);
      setMatchID(matchIDUpdate);
      setCredentials(credentialsUpdate);
    };

    getGames();
  }, []);

  return (
    <GameClient
      playerID={playerID}
      matchID={matchID}
      credentials={credentials}
    />
  );
};
