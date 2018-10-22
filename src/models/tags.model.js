// tags-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const tags = new Schema(
    {
      tag: { type: String, required: false }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('tags', tags);
};
