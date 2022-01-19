import {CloudFunction} from 'firebase-functions/v1';
import {GetSpotifyFirebaseCustomTokenData} from '../../type/api/auth';
import puppeteer from 'puppeteer';
import {assert, expect} from 'chai';
import {HttpsError} from 'firebase-functions/v1/https';
import {testAdmin, testFunctions} from '../setup.test';
import {clearTestUser} from '../auth.test';

describe('api/auth', () => {
  let Functions: {
    getSpotifyOAuthUrl: CloudFunction<Promise<string>>;
    getSpotifyFirebaseCustomToken: CloudFunction<Promise<string>>;
  };

  let signinUrl: string;
  let spotifyCode: string;

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
      signinUrl = result;
      expect(result).to.be.include('https://accounts.spotify.com/authorize');
    });

    it('signin with spotify', async () => {
      const browser = await puppeteer.launch({
        headless: true,
        timeout: 15000,
      });
      const page = await browser.newPage();
      await page.goto(signinUrl);
      await page.type(
        '#login-username',
        process.env.SPOTIFY_TEST_ACCOUNT_ID || '',
      );
      await page.type(
        '#login-password',
        process.env.SPOTIFY_TEST_ACCOUNT_PASSWORD || '',
      );
      await page.waitForTimeout(1000);
      await page.click('#login-button');
      await page.waitForResponse(res => {
        if (
          !res
            .url()
            .includes(
              'https://music-shorts-auth.firebaseapp.com/spotify/popup.html',
            )
        )
          return false;
        spotifyCode = res.url().split('code=')[1].split('&')[0];
        return true;
      });

      await browser.close();
      expect(spotifyCode.length).to.be.greaterThanOrEqual(1);
    }).timeout(15000);
  });

  context('getSpotifyFirebaseCustomToken', () => {
    it('return string type token', async () => {
      const result = await testFunctions.wrap(
        Functions.getSpotifyFirebaseCustomToken,
      )({
        spotifyCode,
      } as GetSpotifyFirebaseCustomTokenData);
      expect(result).to.be.a('string');
    }).timeout(10000);

    it('throw error incorrect spotifyCode', async () => {
      const result = await testFunctions
        .wrap(Functions.getSpotifyFirebaseCustomToken)({
          spotifyCode: 'error_code',
        } as GetSpotifyFirebaseCustomTokenData)
        .catch((e: any) => e);
      expect(result).to.be.an('error');
    }).timeout(10000);

    it('throw error when already signed in', async () => {
      const result = await testFunctions
        .wrap(Functions.getSpotifyFirebaseCustomToken)(
          {
            spotifyCode: 'testCode',
          } as GetSpotifyFirebaseCustomTokenData,
          {auth: true},
        )
        .catch((e: any) => e);
      expect(result.constructor).to.equal(HttpsError);
    }).timeout(10000);
  });
});
