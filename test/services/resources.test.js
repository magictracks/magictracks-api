const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const memory = require('feathers-memory');
// const app = require('../../src/app');

// let mongoose = require("mongoose");
// let Resources = require('../../src/models/resources.model.js');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe("'resources' service", () => {
  let app;

  // it('registered the service', () => {
  //   const service = app.service('resources');
  //   assert.ok(service, 'Registered the service');
  // });

  beforeEach(async () => {
    // create a new dummy feathers app
    app = feathers();
    
    // Database adapter pagination options
    const options = {
      paginate: {
        default: 10,
        max: 25
      }
    };

    // Register `users` and `messages` service in-memory
    app.use('/users', memory(options));

    app.use('/resources', memory(options));

    app.use('/resources/all', {
      async find(params) {
        let result = await app.service('resources').find({});
        return result;
      }
    });

    // Add the hook to the dummy service
    // app.service('messages').hooks({
    //   after: populateUser()
    // });

    // Create a new user we can use to test with
    // user = await app.service('users').create({
    //   email: 'test@user.com'
    // });

    // create some messages to test with
    // for (let i = 0; i < 10; i++) {
      let i = 0;
      let resource = await app.service('resources').create({
        title: `test number: ${i}`,
        description: `test test test number: ${i}`,
        url: `test.com/test/subtest/subsubtest/${i}`
      });
      console.log(resource);
    // }
  });

  it('/GET /resources/all',  (done) => {
    chai
      .request("http://localhost:3030")
      .get('/resources/all')
      .end((err, res) => {
        console.log(res.body);
        res.should.have.status(200);
        res.body.should.be.a('array');
        // res.body.length.should.be.eql(0);
        done();
      });
  });

  // describe('GET /resources/all', () => {
  //   it('it should GET all the resources, returning an array', done => {
  //     chai
  //       .request(app)
  //       .get('/resources/all')
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.body.should.be.a('array');
  //         // res.body.length.should.be.eql(0);
  //         done();
  //       });
  //   });
  // });

  // // TODO: TEST ALL THE API ENDPOINTS - NEED TO SETUP TESTING DB
  // describe('PUT /resources/add', () => {
  //   it('it should PUT one resource, returning the new JSON Object', done => {
  //     chai
  //       .request(app)
  //       .post('/resources/add')
  //       .send({
  //         _method: 'post',
  //         title: 'test test test',
  //         description: 'test test test',
  //         url: 'itp.nyu.edu'
  //       })
  //       .end(async (err, res) => {
  //         res.should.have.status(201);
  //         res.body.should.be.a('object');
  //         // res.body.length.should.be.eql(0);

  //         // remove the resource that was just added
  //         await app.service('resources').remove(res.body._id);
  //         done();
  //       });
  //   });
  // });
});
