// Initializes the `resources` service on path `/resources`
const createService = require('feathers-mongoose');
const createModel = require('../../models/resources.model');
const hooks = require('./resources.hooks');

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  /**
   * @@ ROUTE: /resources/all
   */
  app.use('/resources/all', {
    /**
     * GET
     * @param {*} params
     * returns an ARRAY of the sections
     */
    async find(params) {
      try {
        const result = await Model.find({});
        return result;
      } catch (err) {
        return err;
      }
    }
  });
  // app.service('/sections/:id/test').hooks(hooks);

  /**
   * @@ ROUTE: /resources/id/:id
   */
  app.use('/resources/id/:id', {
    /**
     * FIND
     * @param {*} params
     * finds the data by id and returns it
     */
    async find(params) {
      try {
        const { id } = params.route;
        const result = await Model.findOne({ _id: id });
        return result;
      } catch (err) {
        return err;
      }
    },
    /**
     * PATCH
     * @param {*} _id
     * @param {*} data
     * @param {*} params
     * finds the data by id and returns the updated data
     */
    async patch(_id, data, params) {
      try {
        const { id } = params.route;
        const result = await Model.findByIdAndUpdate(
          id,
          { $set: data },
          { new: true }
        );
        return result;
      } catch (err) {
        return err;
      }
    },

    /**
     * REMOVE
     * @param {*} _id
     * @param {*} params
     * finds the data by id and returns 'resource removed' when it has been removed
     */
    async remove(_id, params) {
      try {
        const { id } = params.route;
        const result = await Model.deleteOne({ _id: id });
        console.log(id, result);

        return { message: 'resource removed!' };
      } catch (err) {
        return err;
      }
    }
  });

  /**
   * @@ ROUTE: /resources/add
   */
  app.use('/resources/add', {
    /**
     * CREATE
     * @param {*} data
     * @param {*} params
     * send in a json object of data and get back the submitted object
     */
    async create(data, params) {
      try {
        const result = await Model.create(data);
        return result;
      } catch (err) {
        return err;
      }
    }
  });
  // app.service('/sections/:id/test').hooks(hooks);

  // Initialize our service with any options it requires
  app.use('/resources', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('resources');

  service.hooks(hooks);
};
