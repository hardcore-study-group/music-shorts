import {expect} from 'chai';
import {UserRecord} from 'firebase-admin/lib/auth/user-record';
import {CloudFunction} from 'firebase-functions/v1';
import {clearTestUser, createTestUser} from '../auth.test';

describe('api/track', () => {
  let Functions: {
    addTrack: CloudFunction<Promise<any>>;
    getRecommendTracks: CloudFunction<Promise<any>>;
    getTracks: CloudFunction<Promise<any>>;
    removeTrack: CloudFunction<Promise<any>>;
  };
  let user: UserRecord;
  before(async function () {
    Functions = require('../../src/api/track');
    user = await createTestUser();
  });

  after(async () => {
    await clearTestUser();
  });
});
