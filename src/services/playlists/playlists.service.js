// Initializes the `playlists` service on path `/playlists`
const createService = require('feathers-mongoose');
const createModel = require('../../models/playlists.model');
const hooks = require('./playlists.hooks');

module.exports = function(app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  /**
   * /playlists/all
   */
  app.use('/playlists/all', {
    /**
     * FIND()
     * @param {*} params
     * returns an ARRAY of the playlists
     */
    async find(params) {
      const result = await Model.find({})
        .populate({
          path: 'sections',
          model: 'sections',
          populate: {
            path: 'resources',
            model: 'resources'
          }
        })
        .exec();
      return result;
    }
  });
  // app.service('/playlists/:id/test').hooks(hooks);

  /**
   * @@ Route: /playlists/id/:id
   */
  app.use('/playlists/id/:id', {
    /**
     * FIND()
     * @param {*} params
     * returns a JSON of the requested section with the ID specified
     */
    async find(params) {
      try {
        const { id } = params.route;
        console.log(id);
        const result = await Model.findOne({ _id: id })
          .populate({
            path: 'sections',
            model: 'sections',
            populate: {
              path: 'resources',
              model: 'resources'
            }
          })
          .exec();
        return result;
      } catch (err) {
        return err;
      }
    },
    /**
     * PATCH()
     * @param {*} params
     * returns a json of the updated values.
     * NOTE: if you want to $push or remove values from an array, see /playlists/<action>/:property/id/:id
     */
    async patch(_id, data, params) {
      try {
        const { id } = params.route;
        const result = await Model.findByIdAndUpdate(
          id,
          { $set: data },
          { new: true }
        )
          .populate({
            path: 'sections',
            model: 'sections',
            populate: {
              path: 'resources',
              model: 'resources'
            }
          })
          .exec();

        return result;
      } catch (err) {
        return err;
      }
    },

    /**
     * REMOVE
     * @param {*} _id
     * @param {*} params
     * using the id provided, remove the specified section from the database
     */
    async remove(_id, params) {
      try {
        const { id } = params.route;
        const result = await Model.deleteOne({ _id: id });
        return { message: 'playlist removed!' };
      } catch (err) {
        return { message: err };
      }
    }
  });
  // app.service('/playlists/:id/test').hooks(hooks);

  /**
   * @@ ROUTE: /playlists/id/:id/appendOne/:property
   * :property == resources, tags, users, etc
   * TODO: make sure to sanitize out any Users, etc
   */
  app.use('/playlists/id/:id/appendOne/:property', {
    /**
     * Patch()
     * @param {*} _id
     * @param {*} data
     * @param {*} params
     * using the property specified in the URL, push one value from the payload to that array
     */
    async patch(_id, data, params) {
      try {
        const { id } = params.route;
        const { property } = params.route;
        const result = await Model.findByIdAndUpdate(
          id,
          { $push: { [property]: data.payload } },
          { new: true }
        )
          .populate({
            path: 'sections',
            model: 'sections',
            populate: {
              path: 'resources',
              model: 'resources'
            }
          })
          .exec();

        return result;
      } catch (err) {
        return err;
      }
    }
  });

   /**
   * @@ ROUTE: /playlists/id/:id/appendOne/:property
   * :property == resources, tags, users, etc
   * TODO: make sure to sanitize out any Users, etc
   */
  app.use('/playlists/batch', {
    /**
     * Patch()
     * @param {*} _id
     * @param {*} data
     * @param {*} params
     * using the property specified in the URL, push one value from the payload to that array
     */
    async create( data, params) {
      try {
        // const { property } = params.route;
        // const result = await Model.create(data);
        // data = JSON.parse(data);
        var Parent = Model.model('playlists')
        var parent = new Parent(data);
        // data.sections.forEach(section => {
        //   parent.sections.push(section);
        // })
        // console.log(parent);
        parent.save();


        return parent;
      } catch (err) {
        return err;
      }
    }
  });

  /**
   * @@ ROUTE: /playlists/id/:id/removeOne/:property
   */
  app.use('/playlists/id/:id/removeOne/:property', {
    /**
     * Patch()
     * @param {*} _id
     * @param {*} data
     * @param {*} params
     * using the property specified in the URL, pull the value specified from that array
     */
    async patch(_id, data, params) {
      try {
        const { id } = params.route;
        const { property } = params.route;
        const result = await Model.findByIdAndUpdate(
          id,
          { $pull: { [property]: data.payload } },
          { new: true }
        )
          .populate({
            path: 'sections',
            model: 'sections',
            populate: {
              path: 'resources',
              model: 'resources'
            }
          })
          .exec();

        return result;
      } catch (err) {
        return err;
      }
    }
  });

  // Initialize our service with any options it requires
  app.use('/playlists', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('playlists');

  service.hooks(hooks);
};
