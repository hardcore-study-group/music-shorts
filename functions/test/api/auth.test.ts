import {CloudFunction} from 'firebase-functions/v1';
import {GetSpotifyFirebaseCustomTokenData} from '../../type/api/auth';
import {assert, expect} from 'chai';
import {HttpsError} from 'firebase-functions/v1/https';
import {testAdmin, testFunctions} from '../setup.test';
import {clearTestUser} from '../auth.test';

describe('api/auth', () => {
  let Functions: {
    getSpotifyOAuthUrl: CloudFunction<Promise<string>>;
    getSpotifyFirebaseCustomToken: CloudFunction<Promise<string>>;
  };

  before(() => {
    Functions = require('../../src/api/auth');
  });

  after(async () => {
    // delete user
    await clearTestUser();
  });

  context('getSpotifyOAuthUrl', () => {
    it('check return url format', async () => {
      const result = await testFunctions.wrap(Functions.getSpotifyOAuthUrl)({});
      expect(result).to.be.include('https://accounts.spotify.com/authorize');
    });
  });

  context('getSpotifyFirebaseCustomToken', () => {
    it('return string type token', async () => {
      const result = await testFunctions.wrap(
        Functions.getSpotifyFirebaseCustomToken,
      )({
        spotifyCode: 'test_code',
      } as GetSpotifyFirebaseCustomTokenData);
      expect(result).to.be.a('string');
    }).timeout(10000);

    it('throw error when already signed in', async () => {
      const result = await testFunctions
        .wrap(Functions.getSpotifyFirebaseCustomToken)(
          {
            spotifyCode: 'test_code',
          } as GetSpotifyFirebaseCustomTokenData,
          {auth: true},
        )
        .catch((e: any) => e);
      expect(result.constructor).to.equal(HttpsError);
    }).timeout(10000);
  });
});
