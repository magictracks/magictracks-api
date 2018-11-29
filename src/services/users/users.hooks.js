const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

module.exports = {
  before: {
    all: [],
    find: [ async (context) => {
      const { params } = context;
      const { Model } = context.app.service(context.path);
      const result = await Model.find(params.query);
      context.result = result;
      return context;
    } ],
    get: [ async (context) => {
      const { params } = context;
      const { Model } = context.app.service(context.path);
      const result = await Model.find(params.query);
      context.result = result;
      return context;
    } ],
    create: [ hashPassword() ],
    update: [ hashPassword(),  authenticate('jwt') ],
    patch: [ hashPassword(),  authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password'),protect('email'), protect('permissions')
    ],
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
