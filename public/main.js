var app = feathers();
// Connect to a different URL
var restClient = feathers.rest('http://localhost:3030')

// Configure an AJAX library (see below) with that client
app.configure(restClient.fetch(window.fetch));

// Connect to the `http://localhost:3030/resources` service
const resources = app.service('resources');
const sections = app.service('sections');
const playlists = app.service('playlists');

