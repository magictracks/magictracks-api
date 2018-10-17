const { authenticate } = require('@feathersjs/authentication').hooks;
const populate = require("../../hooks/populate");
const batchListUpdate = require("../../hooks/batch-list-update");

// authenticate('jwt')
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [batchListUpdate()],
    remove: []
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
