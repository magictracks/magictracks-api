const { authenticate } = require('@feathersjs/authentication').hooks;
// const populate = require('../../hooks/populate');
const sanitizeUser = require('../../hooks/sanitizeUser');
// const batchListUpdate = require('../../hooks/batch-list-update');

// authenticate('jwt')
// populate()
// batchListUpdate()
module.exports = {
  before: {
    all: [],
    find: [ async (context) => {
      const { params } = context;
      const { Model } = context.app.service(context.path);
      const result = await Model.find(params.query)
            .populate({
              path: 'sections',
              model: 'sections',
              populate: {
                path: 'resources',
                model: 'resources'
              }
            })
            .exec();
      context.result = result;
      return context;
    }],
    get: [],
    create: [authenticate('jwt')],
    update: [authenticate('jwt')],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
