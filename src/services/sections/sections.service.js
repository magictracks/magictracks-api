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

  // Initialize our service with any options it requires
  app.use('/sections', createService(options));

  // app.use('/sections/:id/test', {
  //   async find(params){
  //     const { id } = params.route;
  //     const results = await app.service('sections').get(id);
  //
  //     let populated = results.populate("resources").exec();
  //
  //     // console.log("i'm the results", results);
  //     return populated;
  //   }
  // });
  //
  // app.service('/sections/:id/test').hooks(hooks);


  // Get our initialized service so that we can register hooks
  const service = app.service('sections');

  service.hooks(hooks);
};
