import {CloudFunction} from 'firebase-functions/v1';
import {GetSpotifyFirebaseCustomTokenData} from '../../type/api/auth';
import {testFunctions} from '../index.test';
import puppeteer from 'puppeteer';

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

  describe('getSpotifyOAuthUrl', () => {
    it('check return url format', () =>
      testFunctions
        .wrap(Functions.getSpotifyOAuthUrl)({})
        .then((url: string) => {
          signinUrl = url;
          return url;
        })
        .should.eventually.be.include(
          'https://accounts.spotify.com/authorize',
        ));
  });

  describe('signin with spotify', () => {
    it('with webview', () =>
      (async () => {
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
      })().should.fulfilled).timeout(30000);
  });

  describe('getSpotifyFirebaseCustomToken', () => {
    it('return string type token', () =>
      testFunctions
        .wrap(Functions.getSpotifyFirebaseCustomToken)({
          spotifyCode,
        } as GetSpotifyFirebaseCustomTokenData)
        .should.eventually.be.a('string')).timeout(5000);

    it('throw error incorrect spotifyCode', () =>
      testFunctions.wrap(Functions.getSpotifyFirebaseCustomToken)({
        spotifyCode: 'error_code',
      } as GetSpotifyFirebaseCustomTokenData).should.be.rejected);

    it('throw error when alread signed in', () =>
      testFunctions
        .wrap(Functions.getSpotifyFirebaseCustomToken)(
          {
            spotifyCode: 'testCode',
          } as GetSpotifyFirebaseCustomTokenData,
          {auth: true},
        )
        .should.be.rejectedWith('Already signed in'));
  });
});
