// Initializes the `tags` service on path `/tags`
const createService = require('feathers-mongoose');
const createModel = require('../../models/tags.model');
const hooks = require('./tags.hooks');

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  app.use('/tags/all', {
    async find(params) {
      const result = Model.find({});
      return result;
    }
  });

  /**
   * @@ ROUTE: /resources/id/:id
   */
  app.use('/tags/id/:id', {
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

        return { message: 'tag removed!' };
      } catch (err) {
        return err;
      }
    }
  });

  /**
   * @@ ROUTE: /resources/add
   */
  app.use('/tags/add', {
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

  // Initialize our service with any options it requires
  app.use('/tags', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('tags');

  service.hooks(hooks);
};
