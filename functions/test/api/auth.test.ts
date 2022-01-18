import {CloudFunction} from 'firebase-functions/v1';
import {GetSpotifyFirebaseCustomTokenData} from '../../type/api/auth';
import puppeteer from 'puppeteer';
import {expect} from 'chai';
import '../index.test';
import {HttpsError} from 'firebase-functions/v1/https';

describe('api/auth', () => {
  let Functions: {
    getSpotifyOAuthUrl: CloudFunction<Promise<string>>;
    getSpotifyFirebaseCustomToken: CloudFunction<Promise<string>>;
  };

  let signinUrl: string;
  let spotifyCode: string;

  before(function () {
    Functions = require('../../src/api/auth');
  });

  context('getSpotifyOAuthUrl', function () {
    it('check return url format', async function () {
      const result = await this.testFunctions.wrap(
        Functions.getSpotifyOAuthUrl,
      )();
      expect(result).to.be.include('https://accounts.spotify.com/authorize');
      signinUrl = result;
    });

    it('signin with spotify', async function () {
      const browser = await puppeteer.launch({
        headless: true,
        timeout: 30000,
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
    });
  });

  context('getSpotifyFirebaseCustomToken', function () {
    it('return string type token', async function () {
      const result = await this.testFunctions.wrap(
        Functions.getSpotifyFirebaseCustomToken,
      )({
        spotifyCode,
      } as GetSpotifyFirebaseCustomTokenData);

      expect(result).to.be.a('string');
    });

    it('throw error incorrect spotifyCode', async function () {
      const result = await this.testFunctions
        .wrap(Functions.getSpotifyFirebaseCustomToken)({
          spotifyCode: 'error_code',
        } as GetSpotifyFirebaseCustomTokenData)
        .catch((e: any) => e);

      expect(result).to.throw(Error);
    });

    it('throw error when alread signed in', async function () {
      const result = await this.testFunctions
        .wrap(Functions.getSpotifyFirebaseCustomToken)(
          {
            spotifyCode: 'testCode',
          } as GetSpotifyFirebaseCustomTokenData,
          {auth: true},
        )
        .catch((e: any) => e);
      expect(result).to.throw(HttpsError, 'Already signed in');
    });
  });
});
