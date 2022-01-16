import testServiceAccountkey from '../../testServiceAccountKey.json';
import chaiAsPromised from 'chai-as-promised';
import chai from 'chai';
import firebaseFunctionsTest from 'firebase-functions-test';
import _admin from 'firebase-admin';

const setup = () => {
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

  after(() => {
    testFunctions.cleanup();
  });

  return {
    testFunctions,
    testAdmin,
  };
};

export default setup;
