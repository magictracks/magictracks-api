const users = require('./users/users.service.js');
const resources = require('./resources/resources.service.js');
const sections = require('./sections/sections.service.js');
const playlists = require('./playlists/playlists.service.js');
const tags = require('./tags/tags.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(resources);
  app.configure(sections);
  app.configure(playlists);
  app.configure(tags);
};
