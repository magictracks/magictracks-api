const {
  authenticate
} = require('@feathersjs/authentication').hooks;
const addSubmittedBy = require('../../hooks/add-submitted-by');
const sanitizeUser = require('../../hooks/sanitizeUser');

module.exports = {
  before: {
    all: [],
    find: [ async (context) => {
      const {
        params
      } = context;

      const {
        Model
      } = context.app.service(context.path);
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
      
      context.result = Object.assign({'data':[]}, context.result)
      context.result.data = result;
      return context;
    }],
    get: [async (context) => {
      const {
        params
      } = context;
      const {
        Model
      } = context.app.service(context.path);
      const result = await Model.findOne({_id:context.id})
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
    patch: [async (context) => {
      const {
        params
      } = context;
      const {
        Model
      } = context.app.service(context.path);

      console.log("🌈🌈🌈🌈", context.id)
      const result = await Model.find({_id: String(context.id) })
        .populate({
          path: 'sections',
          model: 'sections',
          populate: {
            path: 'resources',
            model: 'resources'
          }
        })
        .exec();

      context.result = result[0];
      return context;

    }],
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
