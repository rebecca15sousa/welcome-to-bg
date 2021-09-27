import { Client } from 'boardgame.io/client';
import { SocketIO } from 'boardgame.io/multiplayer'
import { WelcomeTo } from './Game';
// import { Local } from 'boardgame.io/multiplayer'

class WelcomeToClient {
  constructor(rootElement, {playerID} = {}) {
    this.client = Client({
      game: WelcomeTo,
      numPlayers: 1,
      multiplayer: SocketIO({ server: 'localhost:8000' }),
      // matchID: 'matchID',
      playerID,
      // credentials: 'credentials',
      // debug: true,
      });
    this.client.start();
  }

  update(state) {
    if (state === null) return;
    // ...
  }

}

const appElement = document.getElementById('app');
const playerIDs = ['Player'];
const clients = playerIDs.map(playerID => {
  const rootElement = document.createElement('div');
  appElement.append(rootElement);
  return new WelcomeToClient(rootElement, { playerID });
});
