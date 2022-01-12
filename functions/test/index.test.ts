import firebaseFunctionsTest from 'firebase-functions-test';
// import * as admin from "firebase-admin";
import {assert} from 'chai';
import {CloudFunction} from 'firebase-functions/v1';

// initialize functions test mode
export const test = firebaseFunctionsTest(
  {
    databaseURL: 'https://music-shorts-test.firebaseio.com',
    storageBucket: 'music-shorts-test.appspot.com',
    projectId: 'music-shorts-test',
  },
  'testServiceAccountKey.json',
);
// set functions config
test.mockConfig({
  spotify: {
    client_id: '59420b8a2fe94e9db278b76bd580f476',
    client_secret: '09bc408b7a4241ecb2817b7b17bbb6ce',
    redirect_uri: 'http://localhost:6000/spotify/popup.html',
  },
});

describe('/', () => {
  let Functions: {
    isRunning: CloudFunction<void>;
  };
  before(() => {
    Functions = require('../src/index');
  });

  after(() => {
    test.cleanup();
  });

  it('Functions "isRunning" will return "server is running"', async () => {
    const data = await test.wrap(Functions.isRunning)({});
    assert.equal(data, 'server is running');
  });
});
