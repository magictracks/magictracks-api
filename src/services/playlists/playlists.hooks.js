const { authenticate } = require('@feathersjs/authentication').hooks;
// const populate = require('../../hooks/populate');
const sanitizeUser = require('../../hooks/sanitizeUser');
// const batchListUpdate = require('../../hooks/batch-list-update');

// authenticate('jwt')
// populate()
// batchListUpdate()
module.exports = {
  before: {
    all: [  ],
    find: [],
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
