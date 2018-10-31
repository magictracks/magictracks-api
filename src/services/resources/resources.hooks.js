const { authenticate } = require('@feathersjs/authentication').hooks;
const sanitizeUser = require('../../hooks/sanitizeUser');
const checkPermissions = require('../../hooks/check-permissions')
// const authHooks = require('feathers-authentication-hooks');

// console.log(authHooks);
module.exports = {
  before: {
    all: [  ],
    find: [],
    get: [],
    create: [authenticate('jwt')],
    update: [authenticate('jwt'), checkPermissions()],
    patch: [authenticate('jwt'), checkPermissions()],
    remove: [authenticate('jwt'), checkPermissions()]
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
