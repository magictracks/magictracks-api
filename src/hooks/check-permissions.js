// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const { Forbidden } = require('feathers-errors');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const {
      app,
      method,
      data,
      path,
      params
    } = context;

    const isExternal = !!params.provider;
    const userId = params.user._id;


    // get the resource from the DB;
    let resource = await app.service('resources').get(params.route.id)
    // check who the collaborators are
    // TODO: maybe it is better to do collaborators using usernames rather than IDs?
    let isCollaborator = resource.collaborators.some( (collaborator) => collaborator.toString() == userId.toString());

    // if it is either owned by the current user or the user is a collaborator, allow the actions
    // otherwise throw an error
    if(userId == resource.submittedBy || isCollaborator == true){
      return context;
    } else{
      throw new Forbidden('You are not allowed to access this');
    }

    // console.log(params.user.permissions)
    // if (isExternal && !context.params.user.permissions.includes('messages::create')) {
    //   throw new Forbidden('You are not allowed to access this');
    // }
    // return context;
  };
};
