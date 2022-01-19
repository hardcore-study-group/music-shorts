import puppeteer from 'puppeteer';
import {GetSpotifyFirebaseCustomTokenData} from '../type/api/auth';
import {testAdmin, testFunctions} from './setup.test';

export const createTestUser = async () => {
  // get Auth modules
  const Functions = require('../src/api/auth');
  // get Signin url
  const signinUrl = await testFunctions.wrap<Promise<string>>(
    Functions.getSpotifyOAuthUrl,
  )({});

  // get spotify code
  let spotifyCode = '';
  const browser = await puppeteer.launch({
    headless: true,
    timeout: 30000,
  });

  const page = await browser.newPage();
  await page.goto(signinUrl);
  await page.type('#login-username', process.env.SPOTIFY_TEST_ACCOUNT_ID || '');
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
  // create user
  await testFunctions.wrap<Promise<string>>(
    Functions.getSpotifyFirebaseCustomToken,
  )({
    spotifyCode,
  } as GetSpotifyFirebaseCustomTokenData);

  const user = await testAdmin
    .auth()
    .getUserByEmail(process.env.SPOTIFY_TEST_ACCOUNT_ID || '');
  await testAdmin.firestore().collection('user').doc(user.uid).update({
    is_admin: true,
  });
  return user;
};

export const clearTestUser = async () => {
  try {
    const user = await testAdmin
      .auth()
      .getUserByEmail(process.env.SPOTIFY_TEST_ACCOUNT_ID || '');
    await testAdmin.auth().deleteUser(user.uid);
  } catch (_error) {
    const error = _error as any;
    if (error.errorInfo.code !== 'auth/user-not-found') throw _error;
  }
};
