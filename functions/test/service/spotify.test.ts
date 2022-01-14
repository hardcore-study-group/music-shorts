import {assert} from 'chai';

describe('service/spotify', () => {
  let service: {
    getOAuthUrl: () => string;
  };

  before(async () => {
    service = require('../../src/service/spotify');
  });

  describe('getOAuthUrl', () => {
    it('Check return url format', () =>
      service
        .getOAuthUrl()
        .should.be.include('https://accounts.spotify.com/authorize'));
  });
});
