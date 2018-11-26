// playlists-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  var mongooseVersion = require('mongoose-version');
  const {
    Schema
  } = mongooseClient;
  const playlists = new Schema({
    title: {
      type: String,
      required: false
    },
    featureType:{
      type: String,
      required: false,
      default:"playlists"
    },
    description: {
      type: String,
      required: false
    },
    url: {
      type: String,
      required: false
    },
    tags: [{
      type: Schema.Types.ObjectId,
      default: [],
      required: false,
      ref:'tags'
    }],
    submittedBy:{
      type: Schema.Types.ObjectId,
      required: false,
      ref:'users'
    },
    collaborators: [{
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'users',
      default:[]
    }],
    keywords: [{
      type: String,
      default: [],
      required: false
    }],
    difficulty: [{
      type: String,
      default: [],
      required: false
    }],
    imageUrl: {
      type: String,
      required: false
    },
    sections: [{
      type: Schema.Types.ObjectId,
      ref: 'sections',
      default: [],
      required: false
    }],
    editable:{
      type: Boolean,
      required: false,
      default: true
    }
  }, {
    timestamps: true
  });

  playlists.plugin(mongooseVersion, {
    collection: "playlists_versions",
    strategy: 'array',
    maxVersions: 25
  });


  return mongooseClient.model('playlists', playlists);
};
