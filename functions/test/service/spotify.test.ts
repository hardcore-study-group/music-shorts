import {assert} from 'chai';
import {testFunctions} from '../index.test';

describe('service/spotify', () => {
  let service: {
    getOAuthUrl: () => string;
  };

  before(async () => {
    service = require('../../src/service/spotify');
  });

  describe('getOAuthUrl', () => {
    it('return string type url', async () => {
      const data = service.getOAuthUrl();
      assert.typeOf(data, 'string', 'url type is a string');
      assert.include(
        data,
        'https://accounts.spotify.com/authorize',
        'spotify url format',
      );
    });
  });
});
