// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({
    email: {
      type: String,
      unique: true,
      lowercase: true
    },
    username: {
      type: String,
      unique: true,
      lowercase: true
    },
    description: {
      type: String
    },
    password: {
      type: String
    },
    verified: {
      type: Boolean,
      default: false
    },
    permissions: {
      type: Array,
      default: ['resources::create', 'resources::update', 'resources::get', 'resources::find', 'resources::patch', 'resources::delete',
        'sections::create', 'sections::get', 'sections::update', 'sections::find', 'sections::patch', 'sections::delete',
        'playlists::create', 'playlists::get', 'playlists::update', 'playlists::find', 'playlists::patch', 'playlists::delete',
        'tags::create', 'tags::get', 'tags::find', 'tags::update', 'tags::patch', 'tags::delete',
        'comments::create', 'comments::get', 'comments::find', 'comments::update', 'comments::patch', 'comments::delete'
      ]
    }
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
