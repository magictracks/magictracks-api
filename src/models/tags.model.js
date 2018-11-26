// tags-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  var mongooseVersion = require('mongoose-version');

  const tags = new Schema(
    {
      tag: { type: String, required: false },
      featureType:{
        type: String,
        required: false,
        default:"tags"
      },
    },
    {
      timestamps: true
    }
  );

  tags.plugin(mongooseVersion, {
    collection: "tags_versions",
    strategy: 'array',
    maxVersions: 25
  });


  return mongooseClient.model('tags', tags);
};
