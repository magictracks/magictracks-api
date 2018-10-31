// sections-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const {
    Schema
  } = mongooseClient;
  const sections = new Schema({
    title: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    url: {
      type: String,
      required: false
    },
    submittedBy: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'users'
    },
    collaborators: [{
      type: Schema.Types.ObjectId,
      required: false,
      ref: 'users',
      default:[]
    }],
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
    difficulty: [{
      type: String,
      default: [],
      required: false
    }],
    imageUrl: {
      type: String,
      required: false
    },
    resources: [{
      type: Schema.Types.ObjectId,
      ref: 'resources',
      default: [],
      required: false
    }]
  }, {
    timestamps: true
  });

  return mongooseClient.model('sections', sections);
};
