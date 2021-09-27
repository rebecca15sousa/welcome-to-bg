const { Server, Origins } = require('boardgame.io/server');
const { WelcomeTo } = require('./Game');

const server = Server({
  games: [WelcomeTo],
  origins: [Origins.LOCALHOST],
});

server.run(8000);
