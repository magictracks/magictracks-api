// resources-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  var mongooseVersion = require('mongoose-version');
  const {
    Schema
  } = mongooseClient;
  const resources = new Schema({
    title: {
      type: String,
      required: false
    },
    featureType:{
      type: String,
      required: false,
      default:"resources"
    },
    description: {
      type: String,
      required: false
    },
    metaDescription: {
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
      ref: 'tags'
    }],
    keywords: [{
      type: String,
      default: [],
      required: false
    }],
    submittedBy: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'users'
    },
    collaborators: [{
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'users',
      default: []
    }],
    submissionCount: {
      type: Number,
      required: false
    },
    difficulty: [{
      type: String,
      default: [],
      required: false
    }],
    imageUrl: {
      type: String,
      required: false
    },
    editable:{
      type: Boolean,
      required: false,
      default: true
    }
  }, {
    timestamps: true
  });

  resources.plugin(mongooseVersion, {
    collection: "resources_versions",
    strategy: 'array',
    maxVersions: 25
  });

  return mongooseClient.model('resources', resources);
};
