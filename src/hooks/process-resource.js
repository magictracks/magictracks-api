// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    // sanitize out the user info!
    const {app, method, result, params} = context;
    context.result.submittedBy = {_id:result.submittedBy._id, username: result.submittedBy.username};
    
    return context;
  };
};
