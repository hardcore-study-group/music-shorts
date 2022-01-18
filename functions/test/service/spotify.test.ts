// import {expect} from 'chai';
// import puppeteer from 'puppeteer';
// import SpotifyWebApi from 'spotify-web-api-node';
// import setup from '../hook/setup';

// describe.skip('service/spotify', () => {
//   const {testAdmin, testFunctions} = setup();

//   let service: {
//     spotify: SpotifyWebApi;
//     getOAuthUrl: () => string;
//     getCredential: (code: string) => Promise<any>;
//     getMe: (accessToken: string) => Promise<any>;
//   };

//   let signinUrl: string;
//   let spotifyCode: string;
//   let accessToken: string;

//   before(async () => {
//     service = require('../../src/service/spotify');
//   });

//   describe('getOAuthUrl', () => {
//     it('Check return url format', () => {
//       signinUrl = service.getOAuthUrl();
//       expect(signinUrl).to.be.include('https://accounts.spotify.com/authorize');
//     });
//   });

//   describe('signin with spotify', () => {
//     it('with webview', () =>
//       (async () => {
//         const browser = await puppeteer.launch({
//           headless: true,
//           timeout: 30000,
//         });
//         const page = await browser.newPage();
//         await page.goto(signinUrl);
//         await page.type(
//           '#login-username',
//           process.env.SPOTIFY_TEST_ACCOUNT_ID || '',
//         );
//         await page.type(
//           '#login-password',
//           process.env.SPOTIFY_TEST_ACCOUNT_PASSWORD || '',
//         );
//         await page.waitForTimeout(1000);
//         await page.click('#login-button');
//         await page.waitForResponse(res => {
//           if (
//             !res
//               .url()
//               .includes(
//                 'https://music-shorts-auth.firebaseapp.com/spotify/popup.html',
//               )
//           )
//             return false;
//           spotifyCode = res.url().split('code=')[1].split('&')[0];
//           return true;
//         });

//         await browser.close();
//       })().should.fulfilled).timeout(30000);
//   });

//   describe('getCredential', () => {
//     it('run with correct code', () =>
//       service
//         .getCredential(spotifyCode)
//         .then(credential => {
//           accessToken = credential.body.access_token;
//           return credential;
//         })
//         .should.eventually.be.deep.include({
//           statusCode: 200,
//         }));

//     it('run with incorrect code', () =>
//       service.getCredential('error_code').should.be.rejected);
//   });

//   describe('getMe', () => {
//     it('run with correct accessToken', () =>
//       service.getMe(accessToken).should.eventually.be.deep.include({
//         statusCode: 200,
//       }));

//     it('run with incorrect accessToken', () =>
//       service.getMe('invalide_token').should.eventually.be.rejected);
//   });
// });
