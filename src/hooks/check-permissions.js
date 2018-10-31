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

    console.log("🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈")

    let resource = await app.service('resources').get(params.route.id)
    resource.collaborators = resource.collaborators.map(item => item.toString());

    if(params.user._id == resource.submittedBy || resource.collaborators.includes(params.user._id.toString()) == true ){
      return context;
    } else{
      throw new Forbidden('You are not allowed to access this');
    }
  
    console.log("🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈🌈")

    
    // console.log(params.user.permissions)
    // if (isExternal && !context.params.user.permissions.includes('messages::create')) {
    //   throw new Forbidden('You are not allowed to access this');
    // }
    // return context;
  };
};
