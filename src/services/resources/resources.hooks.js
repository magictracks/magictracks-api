const { authenticate } = require('@feathersjs/authentication').hooks;
const sanitizeUser = require('../../hooks/sanitizeUser');
const checkPermissions = require('../../hooks/check-permissions')

const addSubmittedBy = require('../../hooks/add-submitted-by');
// const authHooks = require('feathers-authentication-hooks');

// console.log(authHooks);
module.exports = {
  before: {
    all: [  ],
    find: [async (context) => {
      const { params } = context;
      const { Model } = context.app.service(context.path);
      const result = await Model.find(params.query);
      context.result = Object.assign({'data':[]}, context.result)
      context.result.data = result;
      return context;
    }],
    get: [ async (context) => {
      const { params } = context;
      const { Model } = context.app.service(context.path);
      const result = await Model.findOne({_id:context.id});
      context.result = result;
      return context;
    }],
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
