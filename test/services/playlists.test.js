const assert = require('assert');
const app = require('../../src/app');

describe('\'playlists\' service', () => {
  it('registered the service', () => {
    const service = app.service('playlists');

    assert.ok(service, 'Registered the service');
  });
});
