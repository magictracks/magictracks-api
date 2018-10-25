const fs = require('fs');
const rp = require('request-promise');
const Q = require('q');

// const myResources = JSON.parse(fs.readFileSync('data/resources.json'));
// const mySections = JSON.parse(fs.readFileSync('data/sections.json'));
const myPlaylists = JSON.parse(fs.readFileSync('data/playlists-exported.json'));
// const myTags = JSON.parse(fs.readFileSync('data/tags.json'));

console.log(myPlaylists);

myPlaylists.map( async (playlist) => {
    // post the playlist and get the _id
    console.log(playlist)
    // for each section in that playlist, post that section

    // get all the resources from  & post them to the db, get all their _id's as a list

    // then 
})

// if (process.argv[2] == 'resources') {
//   postMany2Mongo(myResources, 'http://127.0.0.1:3030/resources');
// } else if (process.argv[2] == 'sections') {
//   postMany2Mongo(mySections, 'http://127.0.0.1:3030/sections');
// } else if (process.argv[2] == 'playlists') {
//   postMany2Mongo(myPlaylists, 'http://127.0.0.1:3030/playlists');
// } else if (process.argv[2] == 'tags') {
//   postMany2Mongo(myTags, 'http://127.0.0.1:3030/tags');
// }

// function postOne2Mongo(payload, _url) {
//   let options = {
//     method: 'POST',
//     uri: _url,
//     body: payload,
//     json: true
//   };

//   return rp(options)
//     .then(results => {
//       return results;
//     })
//     .catch(err => {
//       return err;
//     });
// }

// function postMany2Mongo(myData, _url) {
//   Q.all(myData.map(payload => postOne2Mongo(payload, _url)))
//     .then(results => {
//       return results;
//     })
//     .catch(err => {
//       console.log(err);
//     });
// }
