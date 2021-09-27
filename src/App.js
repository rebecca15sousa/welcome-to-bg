import { Client } from 'boardgame.io/client';
import { WelcomeTo } from './Game';

class WelcomeToClient {
  constructor() {
    this.client = Client({ game: WelcomeTo });
    this.client.start();
  }
}

const app = new WelcomeToClient();
