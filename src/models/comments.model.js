// comments-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const comments = new Schema({
    text: { type: String, required: true },
    editable:{
      type: Boolean,
      required: false,
      default: true
    },
    featureType:{
      type: String,
      required: false,
      default:"comments"
    },
  }, {
    timestamps: true
  });

  return mongooseClient.model('comments', comments);
};
