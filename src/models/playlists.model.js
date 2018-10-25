// playlists-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const sectionSchema = mongooseClient.model('sections').schema;
  console.log(sectionSchema);
  const playlists = new Schema(
    {
      title: { type: String, required: false },
      description: { type: String, required: false },
      url: { type: String, required: false },
      tags: [{ type: Schema.Types.ObjectId, default: [], required: false }],
      keywords: [{ type: String, default: [], required: false }],
      difficulty: [{ type: String, default: [], required: false }],
      imageUrl: { type: String, required: false },
      sections:{type:[sectionSchema], required:false, default:[]}
      // sections: [
      //   {
      //     type: Schema.Types.ObjectId,
      //     ref: 'sections',
      //     default: [],
      //     required: false
      //   }
      // ]
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('playlists', playlists);
};
