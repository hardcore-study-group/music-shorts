import {assert} from 'chai';
import {test} from '../index.test';

describe('service/spotify', () => {
  let spotify: {
    getOAuthUrl: () => string;
  };

  before(async () => {
    spotify = require('../../src/service/spotify');
  });

  describe('getOAuthUrl', () => {
    it('return string type url', async () => {
      const data = spotify.getOAuthUrl();
      assert.typeOf(data, 'string', 'url type is a string');
      assert.include(
        data,
        'https://accounts.spotify.com/authorize',
        'spotify url format',
      );
    });
  });
});
