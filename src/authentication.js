const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');
const jwtToken = require('jsonwebtoken');

module.exports = function (app) {
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());
  app.configure(local());

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies)
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    },
    after:{
      create: [(context) => {
        const {app} = context;
        const token = context.result.accessToken;
        // const user = jwtToken.decode(token);  
        let user = context.params.user
        context.result = Object.assign({id:user._id, username: user.username}, context.result);
        return context;
      }]
    }
  });
};
