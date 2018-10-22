// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { params } = context;
    const { Model } = context.app.service(context.path);
    // if the get request is for a specific section or playlist sections,
    if (Object.keys(context.params.query).length > 0) {
      const id = params.query._id;
      let result = {};

      // if it is a playlist:
      if (context.path == 'playlists') {
        result = await Model.findOne({ _id: id })
          .populate('sections', {
            path: 'resources',
            model: 'resources'
          })
          .exec();
        // if it is a section:
      } else if (context.path == 'sections') {
        result = await Model.findOne({ _id: id })
          .populate('resources')
          .exec();
        // if anything else:
      }

      context.result = result;
      context.data = result;
      return context;

      // if the get request is for all sections, return all
    } else {
      let result = [];
      // if it is a playlist:
      if (context.path == 'playlists') {
        result = await Model.find({})
          .populate({
            path: 'sections',
            populate: {
              path: 'resources',
              model: 'resources'
            }
          })
          .exec();
        // if it is a section:
      } else if (context.path == 'sections') {
        result = await Model.find({})
          .populate('resources')
          .exec();
        // if anything else:
      }

      context.result = result;
      context.data = result;
      return context;
    }
  };
};
