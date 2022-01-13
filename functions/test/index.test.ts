import firebaseFunctionsTest from 'firebase-functions-test';
// import * as admin from "firebase-admin";
import {assert} from 'chai';
import {CloudFunction} from 'firebase-functions/v1';
import _admin from 'firebase-admin';
import testServiceAccountkey from '../testServiceAccountKey.json';

const FIREBASE_CONFIG: _admin.AppOptions = {
  databaseURL: 'https://music-shorts-test.firebaseio.com',
  storageBucket: 'music-shorts-test.appspot.com',
  projectId: 'music-shorts-test',
  credential: _admin.credential.cert(testServiceAccountkey as any),
};
// initialize functions test mode
export const testFunctions = firebaseFunctionsTest(FIREBASE_CONFIG);
// set functions config
testFunctions.mockConfig({
  spotify: {
    client_id: '59420b8a2fe94e9db278b76bd580f476',
    client_secret: '09bc408b7a4241ecb2817b7b17bbb6ce',
    redirect_uri: 'http://localhost:6000/spotify/popup.html',
  },
});

export const testAdmin = _admin.initializeApp(FIREBASE_CONFIG, 'test_admin');

describe('/', () => {
  let Functions: {
    isRunning: CloudFunction<void>;
  };
  before(() => {
    Functions = require('../src/index');
  });

  after(() => {
    testFunctions.cleanup();
  });

  it('Functions "isRunning" will return "server is running"', async () => {
    const data = await testFunctions.wrap(Functions.isRunning)({});
    assert.equal(data, 'server is running');
  });
});
