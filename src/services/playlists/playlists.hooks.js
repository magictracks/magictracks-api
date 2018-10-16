const { authenticate } = require('@feathersjs/authentication').hooks;
const populate = require("../../hooks/populate");

// authenticate('jwt')
module.exports = {
  before: {
    all: [  ],
    find: [populate()],
    get: [populate()],
    create: [],
    update: [],
    patch: [],
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
