import chaiAsPromised from 'chai-as-promised';
import {CloudFunction} from 'firebase-functions/v1';
import _admin from 'firebase-admin';
import testServiceAccountkey from '../testServiceAccountKey.json';
import chai, {expect} from 'chai';
import firebaseFunctionsTest from 'firebase-functions-test';

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
const testFunctions = firebaseFunctionsTest(FIREBASE_CONFIG);
// set functions config
testFunctions.mockConfig({
  spotify: {
    client_id: process.env.SPOTIFY_TEST_CLIENT_ID,
    client_secret: process.env.SPOTIFY_TEST_SECRET,
    redirect_uri:
      'https://music-shorts-auth.firebaseapp.com/spotify/popup.html',
  },
});

const testAdmin = _admin.initializeApp(FIREBASE_CONFIG, 'test_admin');

describe('/', function () {
  let Functions: {
    isRunning: CloudFunction<Promise<string>>;
  };
  before(function (this) {
    // @ts-ignore
    this.test.ctx.testFunctions = testFunctions;
    // @ts-ignore
    this.test.ctx.testAdmin = testAdmin;
    Functions = require('../src/index');
  });

  after(function () {
    testFunctions.cleanup();
  });

  it('Functions "isRunning" will return "server is running"', async function () {
    const result = await testFunctions.wrap(Functions.isRunning)({});
    expect(result).to.equal('server is running');
  });
});
