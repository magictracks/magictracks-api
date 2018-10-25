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
   * /sections/all
   */
  app.use('/sections/all', {
    /**
     * FIND()
     * @param {*} params
     * returns an ARRAY of the sections
     */
    async find(params) {
      const result = await Model.find({})
        .populate('resources')
        .exec();
      return result;
    }
  });
  // app.service('/sections/:id/test').hooks(hooks);

  /**
   * @@ Route: /sections/id/:id
   */
  app.use('/sections/id/:id', {
    /**
     * FIND()
     * @param {*} params
     * returns a JSON of the requested section with the ID specified
     */
    async find(params) {
      try {
        const {
          id
        } = params.route;
        const result = await Model.findOne({
            _id: id
          })
          .populate('resources')
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
     * NOTE: if you want to $push or remove values from an array, see /sections/<action>/:property/id/:id
     */
    async patch(_id, data, params) {
      try {
        const {
          id
        } = params.route;
        const result = await Model.findByIdAndUpdate(
            id, {
              $set: data
            }, {
              new: true
            }
          )
          .populate('resources')
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
        const {
          id
        } = params.route;
        const result = await Model.deleteOne({
          _id: id
        });
        return {
          message: 'section removed!'
        };
      } catch (err) {
        return {
          message: err
        };
      }
    }
  });
  // app.service('/sections/:id/test').hooks(hooks);

  /**
   * @@ ROUTE: /sections/id/:id/appendOne/:property
   * :property == resources, tags, users, etc
   * TODO: make sure to sanitize out any Users, etc
   */
  app.use('/sections/id/:id/appendOne/:property', {
    /**
     * Patch()
     * @param {*} _id
     * @param {*} data
     * @param {*} params
     * using the property specified in the URL, push one value from the payload to that array
     */
    async patch(_id, data, params) {
      try {
        const {
          id
        } = params.route;
        const {
          property
        } = params.route;
        const result = await Model.findByIdAndUpdate(
            id, {
              $push: {
                [property]: data.payload
              }
            }, {
              new: true
            }
          )
          .populate('resources')
          .exec();

        return result;
      } catch (err) {
        return err;
      }
    }
  });

  /**
   * @@ ROUTE: /playlists/addJSON
   * :property == resources, tags, users, etc
   * TODO: make sure to sanitize out any Users, etc
   */
  app.use('/sections/addJSON', {
    /**
     * create()
     * @param {*} _id
     * @param {*} data
     * @param {*} params
     * Get a JSON of a playlist > 
     * For each section > save all the resources in the db and return their ids > save the section >
     * Return a list of section ids > store them to the playlist.sections > save the playlist
     */
    async create(data, params) {
      try {
        const SectionModel = Model.model('sections');
        const ResourceModel = Model.model('resources');

        let section;
        // create a playlist model which gives us a place to stuff in our ids
        section = new SectionModel(data);

        // get an array of the ids from the data.resources
        // save the resource ids into the data.resources objectId array 
        section.resources = await Promise.all(data.resources.map(async (resource) => {
          try{
            let rsc = await new ResourceModel(resource).save();
            return rsc._id;
          }catch(err1){
            return err1;
          }
        }));
        // save each section
        section = await section.save();

        // return the populated item
        return Model.findById(section._id).populate({
          path: "resources",
          model: "resources"
        }).exec();

      } catch (err) {
        return err;
      }
    }
  });

  /**
   * @@ ROUTE: /sections/id/:id/removeOne/:property
   */
  app.use('/sections/id/:id/removeOne/:property', {
    /**
     * Patch()
     * @param {*} _id
     * @param {*} data
     * @param {*} params
     * using the property specified in the URL, pull the value specified from that array
     * TODO: if you have multiple resources of the same ID in the section,
     * you may need to create an endpint specifically to remove by array index rather
     * than by the id of the resource
     */
    async patch(_id, data, params) {
      try {
        const {
          id
        } = params.route;
        const {
          property
        } = params.route;
        const result = await Model.findByIdAndUpdate(
            id, {
              $pull: {
                [property]: data.payload
              }
            }, {
              new: true
            }
          )
          .populate('resources')
          .exec();

        return result;
      } catch (err) {
        return err;
      }
    }
  });

  // Initialize our service with any options it requires
  app.use('/sections', createService(options));
  // Get our initialized service so that we can register hooks
  const service = app.service('sections');

  service.hooks(hooks);
};
