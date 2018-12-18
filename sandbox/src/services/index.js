const playlists = require('./playlists/playlists.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(playlists);
};
