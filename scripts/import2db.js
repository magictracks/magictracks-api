const fs = require('fs');
const rp = require('request-promise');
const Q = require('q');

const myResources = JSON.parse(fs.readFileSync('data/resources.json'));
const mySections = JSON.parse(fs.readFileSync('data/sections.json'));
const myPlaylists = JSON.parse(fs.readFileSync('data/playlists.json'));
const myTags = JSON.parse(fs.readFileSync('data/tags.json'));

console.log(mySections);

if (process.argv[2] == 'resources') {
  postMany2Mongo(myResources, 'http://127.0.0.1:3030/resources');
} else if (process.argv[2] == 'sections') {
  postMany2Mongo(mySections, 'http://127.0.0.1:3030/sections');
} else if (process.argv[2] == 'playlists') {
  postMany2Mongo(myPlaylists, 'http://127.0.0.1:3030/playlists');
} else if (process.argv[2] == 'tags') {
  postMany2Mongo(myTags, 'http://127.0.0.1:3030/tags');
}

function postOne2Mongo(payload, _url) {
  let options = {
    method: 'POST',
    uri: _url,
    body: payload,
    json: true
  };

  return rp(options)
    .then(results => {
      return results;
    })
    .catch(err => {
      return err;
    });
}

function postMany2Mongo(myData, _url) {
  Q.all(myData.map(payload => postOne2Mongo(payload, _url)))
    .then(results => {
      return results;
    })
    .catch(err => {
      console.log(err);
    });
}
