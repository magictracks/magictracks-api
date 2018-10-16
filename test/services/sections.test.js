const assert = require('assert');
const app = require('../../src/app');

describe('\'sections\' service', () => {
  it('registered the service', () => {
    const service = app.service('sections');

    assert.ok(service, 'Registered the service');
  });
});
