// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function(options = {}) {
  return async context => {
    const { params } = context;
    const { Model } = context.app.service(context.path);
    const { data } = context;

    if (Object.keys(params.query).length > 0 && params.query.batch == 'true') {
      const id = params.query._id;
      let result = {};

      // if it is a playlist:
      if (context.path == 'playlists') {
        result = await Model.findOneAndUpdate(
          { _id: id },
          { $set: { sections: JSON.parse(data.sectionList) } },
          { new: true }
        )
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
        result = await Model.findOneAndUpdate(
          { _id: id },
          { $set: { resources: JSON.parse(data.resourceList) } },
          { new: true }
        )
          .populate('resources')
          .exec();
      }

      context.result = result;
      context.data = result;

      return context;

      // if the get request is for all sections, return all
    } else {
      return context;
    }
  };
};
