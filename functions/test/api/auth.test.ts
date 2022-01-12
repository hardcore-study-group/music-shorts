import {assert} from 'chai';
import {CloudFunction} from 'firebase-functions/v1';
import {test} from '../index.test';

describe('api/auth', () => {
  let Functions: {
    getSpotifyOAuthUrl: CloudFunction<void>;
    getSpotifyFirebaseCustomToken: CloudFunction<void>;
  };
  before(() => {
    Functions = require('../../src/api/auth');
  });

  describe('getSpotifyOAuthUrl', () => {
    it('return string type url', async () => {
      const data = await test.wrap(Functions.getSpotifyOAuthUrl)({});
      assert.typeOf(data, 'string', 'url type is a string');
      assert.include(
        data,
        'https://accounts.spotify.com/authorize',
        'spotify url format',
      );
    });
  });

  // describe("getSpotifyFirebaseCustomToken", () => {
  //   it("return string type token", async () =>{
  //     const data = await test.wrap(Functions.getSpotifyFirebaseCustomToken)({});
  //     assert.typeOf(data, "string", "token type is a string");
  //   });
  // });
});
