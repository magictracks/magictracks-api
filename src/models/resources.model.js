// resources-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const resources = new Schema(
    {
      title: { type: String, required: false },
      description: { type: String, required: false },
      url: { type: String, required: false },
      tags: [{ type: Schema.Types.ObjectId, default: [], required: false }],
      keywords: [{ type: String, default: [], required: false }],
      submittedBy: [
        { type: Schema.Types.ObjectId, default: [], required: false }
      ],
      submissionCount: { type: Number, required: false },
      difficulty: [{ type: String, default: [], required: false }],
      imageUrl: { type: String, required: false }
    },
    {
      timestamps: true
    }
  );

  return mongooseClient.model('resources', resources);
};
