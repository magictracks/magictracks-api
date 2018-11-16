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


  class Handlers {
    constructor() {
      /**  
       * /playlists
       */
      this.general = {
        async find(params) {
          try{
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
          }catch(err){
            return err;
          }
        }, // end find

        /**
         * 
         * @param {*} data 
         * @param {*} params 
         */
        async create(data, params){
          try{
            data = Object.assign({submittedBy: params.user._id}, data)
            const result = await Model.create(data);
            return result;
          }catch(err){
            return err;
          } 
        } // end create

      } // end .playlist

      

      /** 
       * /playlists/id/:id
       */
      // get one
      this.byId = {
        // find
        async find(params) {
          try {
            const {
              id
            } = params.route;
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
        // put one

        /**
         * 
         * @param {*} _id 
         * @param {*} data 
         * [
         *     {"op":"set", "path":"title", "value":"Learning with Dan is my Favorite Thing"}, 
         *     {"op":"set", "path":"description",  "value":"don't you want to learn with Dan?"}, 
         *     {"op":"push", "path":"sections", "value":"5bd366ac399838e5d063aa2c"}
         * ]
         * @param {*} params 
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
        // remove one
        async remove(_id, params) {
          // does this remove all the referenced subdocs as well?
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
      };

      /** 
       * /playlists/id/:id
       */
      // get one
      this.byUser = {
        // find
        async find(params) {
          try {
            const {
              id
            } = params.route;
            const result = await Model.findOne({
                submittedBy: id
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
        }
      };

      this.addJSON = {
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

            
            data = Object.assign({
              submittedBy: params.user._id,
              collaborators: [params.user._id],
            }, data)



            playlist = new PlaylistModel(data);

            console.log(playlist);

            // return an array of section ids after saving them with their respective resources
            playlist.sections = await Promise.all(data.sections.map(async (section) => {
              try {
                // get the section model
                section = Object.assign({
                  submittedBy: params.user._id,
                  collaborators: [params.user._id],
                }, section)

                let sect = new SectionModel(section);
                // get an array of the ids from the saved resources
                // save the resource ids into the sections.resources objectId array 
                // TODO: Add saving for tags and other features requiring populating
                sect.resources = await Promise.all(section.resources.map(async (resource) => {
                  try {
                    resource = Object.assign({
                      submittedBy: params.user._id,
                      collaborators: [params.user._id],
                    }, resource)
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
              path: 'sections',
              model: 'sections',
              populate: {
                path: 'resources',
                model: 'resources'
              }
            }).exec();
          } catch (err) {
            return err;
          }
        }
      };

    }; // end constructor
  }; // end controllers


  handlers = new Handlers();
  // app.use('/playlists', handlers.general);
  // app.use('/playlists/user/:id', handlers.byUser);
  // app.use('/playlists/id/:id', handlers.byId);
  app.use('/playlists/addJSON', handlers.addJSON);
  
  // hooks
  // app.service('/playlists').hooks(hooks);
  // app.service('/playlists/id/:id').hooks(hooks);
  app.service('/playlists/addJSON').hooks(hooks);

  // Initialize our service with any options it requires
  app.use('/playlists', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('playlists');

  service.hooks(hooks);
};
