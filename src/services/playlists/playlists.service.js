// Initializes the `playlists` service on path `/playlists`
const createService = require('feathers-mongoose');
const createModel = require('../../models/playlists.model');
const hooks = require('./playlists.hooks');

module.exports = function (app) {
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
        const {
          id
        } = params.route;
        console.log(id);
        const result = await Model.findOne({
            _id: id
          })
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
        const {
          id
        } = params.route;
        const result = await Model.deleteOne({
          _id: id
        });
        return {
          message: 'playlist removed!'
        };
      } catch (err) {
        return {
          message: err
        };
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
   * @@ ROUTE: /playlists/addJSON
   * :property == resources, tags, users, etc
   * TODO: make sure to sanitize out any Users, etc
   */
  app.use('/playlists/addJSON', {
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
        const PlaylistModel = Model.model('playlists');
        const SectionModel = Model.model('sections');
        const ResourceModel = Model.model('resources');

        let playlist;
        // create a playlist model which gives us a place to stuff in our ids
        playlist = new PlaylistModel(data);

        // return an array of section ids after saving them with their respective resources
        playlist.sections = await Promise.all(data.sections.map(async (section) => {
          try {
            // get the section model
            let sect = new SectionModel(section);
            // get an array of the ids from the saved resources
            // save the resource ids into the sections.resources objectId array 
            sect.resources = await Promise.all(section.resources.map(async (resource) => {
              try {
                let rsc = await new ResourceModel(resource).save();
                return rsc._id;
              } catch (innerErr2) {
                return innerErr2;
              }

            }))
            // save each section
            await sect.save();
            return sect._id;
          } catch (innerErr1) {
            return innerErr1;
          }
        }));

        // add the section ids to the playlist
        playlist = await playlist.save();
        // return the populated item
        return Model.findById(playlist._id).populate({
          path: "sections",
          model: "sections",
          populate: {
            path: "resources",
            model: "resources"
          }
        }).exec();
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
        const {id} = params.route;
        const {property} = params.route;
        const result = await Model.findByIdAndUpdate(
            id, {
              $pull: {
                [property]: data.payload
              }
            }, {
              new: true
            }
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
