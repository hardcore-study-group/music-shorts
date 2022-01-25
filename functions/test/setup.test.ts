import _admin from 'firebase-admin';
import testServiceAccountkey from '../testServiceAccountKey.json';
import chai, {expect} from 'chai';
import firebaseFunctionsTest from 'firebase-functions-test';

chai.should();
require('dotenv').config();

context('env test', () => {
  it('dotenv', () => {
    expect(process.env.FIREBASE_TEST_PROJECT_ID || undefined).to.be.a(
      'string',
      'FIREBASE_TEST_PROJECT_ID',
    );
    // expect(process.env.SPOTIFY_TEST_CLIENT_ID || undefined).to.be.a(
    //   'string',
    //   'SPOTIFY_TEST_CLIENT_ID',
    // );
    // expect(process.env.SPOTIFY_TEST_SECRET || undefined).to.be.a(
    //   'string',
    //   'SPOTIFY_TEST_SECRET',
    // );
    // expect(process.env.SPOTIFY_TEST_ACCOUNT_ID || undefined).to.be.a(
    //   'string',
    //   'SPOTIFY_TEST_ACCOUNT_ID',
    // );
    // // check email format
    // expect((process.env.SPOTIFY_TEST_ACCOUNT_ID || undefined)?.includes('@')).to
    //   .be.true;
    // expect(process.env.SPOTIFY_TEST_ACCOUNT_PASSWORD || undefined).to.be.a(
    //   'string',
    //   'SPOTIFY_TEST_ACCOUNT_PASSWORD',
    // );
  });
});

const FIREBASE_CONFIG: _admin.AppOptions = {
  databaseURL: `https://${process.env.FIREBASE_TEST_PROJECT_ID}.firebaseio.com`,
  storageBucket: `${process.env.FIREBASE_TEST_PROJECT_ID}.appspot.com`,
  projectId: process.env.FIREBASE_TEST_PROJECT_ID,
  credential: _admin.credential.cert(testServiceAccountkey as any),
};
// initialize functions test mode
export const testFunctions = firebaseFunctionsTest(FIREBASE_CONFIG);
// set functions config
testFunctions.mockConfig({});

export const testAdmin = _admin.initializeApp(FIREBASE_CONFIG, 'test_admin');

after(async () => {
  await testFunctions.cleanup();
});
