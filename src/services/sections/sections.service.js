// Initializes the `sections` service on path `/sections`
const createService = require('feathers-mongoose');
const createModel = require('../../models/sections.model');
const hooks = require('./sections.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };


  /**
  * GET
  * /sections/all
  * returns an ARRAY of the sections
  */
  app.use('/sections/all', {
    async find(params){
      const result = await Model.find({}).populate('resources').exec();
      return result;
    }
  });
  // app.service('/sections/:id/test').hooks(hooks);

  /**
  * GET
  * /sections/id/:id
  * returns a JSON of the requested section with the ID specified
  */
  app.use('/sections/id/:id', {
    async find(params){
      const {id} = params.route;

      const result = await Model.findOne({_id:id}).populate('resources').exec();
      return result;
    }
  });
  // app.service('/sections/:id/test').hooks(hooks);


  // Initialize our service with any options it requires
  app.use('/sections', createService(options));
  // Get our initialized service so that we can register hooks
  const service = app.service('sections');

  service.hooks(hooks);
};
