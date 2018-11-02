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
              .populate('submittedBy')
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
            data = Object.assign({submittedBy: params.user._id}, data)
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
              .populate('submittedBy')
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
         * * [
         *     {"op":"set", "path":"title", "value":"Learning with Dan is my Favorite Thing"}, 
         *     {"op":"set", "path":"description",  "value":"don't you want to learn with Dan?"}, 
         *     {"op":"push", "path":"sections", "value":"5bd366ac399838e5d063aa2c"}
         * ]
         */
        async patch(_id, data, params) {
          try {
            const {
              id
            } = params.route;
            let updateProps = {
              "$set": {},
              "$push": {},
              "$pull": {}
            }


            data.forEach( item => {
              if(item.op === "set"){
                updateProps["$set"] = Object.assign({[item.path]: item.value },  updateProps["$set"]);
              } else if (item.op === "push"){
                updateProps["$push"] = Object.assign({[item.path]: item.value },  updateProps["$push"]);
              } else if (item.op === "pull"){
                updateProps["$pull"] = Object.assign({[item.path]: item.value },  updateProps["$pull"]);
              }
            });

            Object.keys(updateProps).forEach( (key) => {
              if( Object.keys(updateProps[key]).length < 1 ){
                delete updateProps[key]
              }
            });
          
            const result = await Model.findOneAndUpdate(
                {_id:id}, updateProps, {
                  new: true
                }
              )
              .populate('resources')
              .populate('submittedBy')
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
            data = Object.assign({
              submittedBy: params.user._id,
              collaborators: [params.user._id],
            }, data)
            // create a playlist model which gives us a place to stuff in our ids
            section = new SectionModel(data);

            // get an array of the ids from the data.resources
            // save the resource ids into the data.resources objectId array 
            section.resources = await Promise.all(data.resources.map(async (resource) => {
              try {
                resource = Object.assign({
                  submittedBy: params.user._id,
                  collaborators: [params.user._id],
                }, resource)
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
  // add hooks
  app.service('/sections').hooks(hooks);
  app.service('/sections/id/:id').hooks(hooks);
  app.service('/sections/addJSON').hooks(hooks);

  // Initialize our service with any options it requires
  app.use('/sections', createService(options));
  // Get our initialized service so that we can register hooks
  const service = app.service('sections');

  service.hooks(hooks);
};
