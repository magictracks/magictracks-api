// sections-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const sections = new Schema({
    title: { type: String, required: false },
    description: { type: String, required: false },
    url:{ type: String, required: false },
    tags:[{ type: Schema.Types.ObjectId , default:[], required: false }],
    keywords:[{ type: String, default:[], required: false }],
    difficulty:[{ type: String, default:[], required: false }],
    imageUrl:{ type: String, required: false },
    resources: [{ type: Schema.Types.ObjectId, ref: 'resources', default:[], unique:true }]
  }, {
    timestamps: true
  });

  return mongooseClient.model('sections', sections);
};
