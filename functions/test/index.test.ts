import {expect} from 'chai';
import {CloudFunction} from 'firebase-functions/v1';
import {testFunctions} from './setup.test';

describe('/', function () {
  let Functions: {
    isRunning: CloudFunction<Promise<string>>;
  };
  beforeEach(function (this) {
    Functions = require('../src/index');
  });

  it('Functions "isRunning" will return "server is running"', async () => {
    const result = await testFunctions.wrap(Functions.isRunning)({});
    expect(result).to.equal('server is running');
  });
});
