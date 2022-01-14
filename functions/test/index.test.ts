import firebaseFunctionsTest from 'firebase-functions-test';
// import * as admin from "firebase-admin";
import {CloudFunction} from 'firebase-functions/v1';
import _admin from 'firebase-admin';
import testServiceAccountkey from '../testServiceAccountKey.json';
import chaiAsPromised from 'chai-as-promised';
import chai from 'chai';

chai.use(chaiAsPromised);
chai.should();
require('dotenv').config();

const FIREBASE_CONFIG: _admin.AppOptions = {
  databaseURL: `https://${process.env.FIREBASE_TEST_PROJECT_ID}.firebaseio.com`,
  storageBucket: `${process.env.FIREBASE_TEST_PROJECT_ID}.appspot.com`,
  projectId: process.env.FIREBASE_TEST_PROJECT_ID,
  credential: _admin.credential.cert(testServiceAccountkey as any),
};
// initialize functions test mode
export const testFunctions = firebaseFunctionsTest(FIREBASE_CONFIG);
// set functions config
testFunctions.mockConfig({
  spotify: {
    client_id: process.env.SPOTIFY_TEST_CLIENT_ID,
    client_secret: process.env.SPOTIFY_TEST_SECRET,
    redirect_uri:
      'https://music-shorts-auth.firebaseapp.com/spotify/popup.html',
  },
});

export const testAdmin = _admin.initializeApp(FIREBASE_CONFIG, 'test_admin');

describe('/', () => {
  let Functions: {
    isRunning: CloudFunction<Promise<string>>;
  };
  before(() => {
    Functions = require('../src/index');
  });

  after(() => {
    testFunctions.cleanup();
  });

  it('Functions "isRunning" will return "server is running"', () =>
    testFunctions
      .wrap(Functions.isRunning)({})
      .should.be.equal('server is running'));
});
