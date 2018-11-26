const { authenticate } = require('@feathersjs/authentication').hooks;
const sanitizeUser = require('../../hooks/sanitizeUser');
const checkPermissions = require('../../hooks/check-permissions')

const addSubmittedBy = require('../../hooks/add-submitted-by');
// const authHooks = require('feathers-authentication-hooks');

// console.log(authHooks);
module.exports = {
  before: {
    all: [  ],
    find: [],
    get: [],
    create: [authenticate('jwt'), addSubmittedBy()],
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
