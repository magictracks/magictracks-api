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

  class Handlers {
    constructor() {
      /** 
       * /sections
       */
      this.general = {
        // do stuff
        /**
         * FIND()
         * @param {*} params
         * returns an ARRAY of the sections
         */
        async find(params) {
          try {
            const result = await Model.find({})
              .populate('resources')
              .exec();
            return result;
          } catch (err) {
            return err;
          }
        },

        /**
         * 
         * @param {*} data 
         * @param {*} params 
         */
        async create(data, params) {
          try {
            const result = await Model.create(data);
            return result;
          } catch (err) {
            return err;
          }
        } // end create
      };

      /** 
       * /sections/id/:id
       */
      this.byId = {
        // do stuff
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
      };

      /** 
       * /sections/addJSON
       */
      this.addJSON = {
        // do stuff
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
              try {
                let rsc = await new ResourceModel(resource).save();
                return rsc._id;
              } catch (err1) {
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
      };

    } // end constructor

  } // end Handlers

  const handlers = new Handlers();
  app.use('/sections', handlers.general);
  app.use('/sections/id/:id', handlers.byId);
  app.use('/sections/addJSON', handlers.addJSON);
  // app.service('/sections/:id/test').hooks(hooks);

  // Initialize our service with any options it requires
  app.use('/sections', createService(options));
  // Get our initialized service so that we can register hooks
  const service = app.service('sections');

  service.hooks(hooks);
};
