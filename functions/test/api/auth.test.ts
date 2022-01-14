import {assert} from 'chai';
import {CloudFunction} from 'firebase-functions/v1';
import {testFunctions} from '../index.test';

describe('api/auth', () => {
  let Functions: {
    getSpotifyOAuthUrl: CloudFunction<void>;
    getSpotifyFirebaseCustomToken: CloudFunction<void>;
  };

  before(() => {
    Functions = require('../../src/api/auth');
  });

  describe('getSpotifyOAuthUrl', () => {
    it('check return url format', () =>
      testFunctions
        .wrap(Functions.getSpotifyOAuthUrl)({})
        .should.eventually.be.include(
          'https://accounts.spotify.com/authorize',
        ));
  });

  // describe('getSpotifyFirebaseCustomToken', () => {
  //   it('return string type token', async () => {
  //     const data = await testFunctions.wrap(
  //       Functions.getSpotifyFirebaseCustomToken,
  //     )({});
  //     assert.typeOf(data, 'string', 'token type is a string');
  //   });
  // });
});
