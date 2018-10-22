const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const app = require('../../src/app');

// let mongoose = require("mongoose");
// let Book = require('../../src/models/book');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
chai.use(chaiHttp);

describe("'resources' service", () => {
  it('registered the service', () => {
    const service = app.service('resources');

    assert.ok(service, 'Registered the service');
  });

  describe('GET /resources/all', () => {
    it('it should GET all the resources', done => {
      chai
        .request(app)
        .get('/resources/all')
        .end((err, res) => {
          console.log('THE STATUS IS', res.status);
          console.log('THE BODY IS', res.body);
          res.should.have.status(200);
          res.body.should.be.a('array');
          // res.body.length.should.be.eql(0);
          done();
        });
    });
  });
});
