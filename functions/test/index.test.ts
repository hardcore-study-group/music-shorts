import firebaseFunctionsTest from 'firebase-functions-test';
import {CloudFunction} from 'firebase-functions/v1';
import _admin from 'firebase-admin';
import setup from './hook/setup.js';

describe('/', () => {
  const {testAdmin, testFunctions} = setup();

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
