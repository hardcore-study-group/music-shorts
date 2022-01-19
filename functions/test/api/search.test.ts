import {expect} from 'chai';
import {UserRecord} from 'firebase-admin/lib/auth/user-record';
import {CloudFunction} from 'firebase-functions/v1';
import {SearchTracksData} from '../../type/api/search';
import {clearTestUser, createTestUser} from '../auth.test';
import {testFunctions} from '../setup.test';

describe('api/search', () => {
  let Functions: {
    searchTracks: CloudFunction<Promise<{items: any}>>;
  };
  let user: UserRecord;

  before(async () => {
    Functions = require('../../src/api/search');
    user = await createTestUser();
  });

  after(async () => {
    await clearTestUser();
  });

  describe('searchTracks', () => {
    it('will be return ', async () => {
      const result = await testFunctions.wrap(Functions.searchTracks)(
        {
          query: 'just two of us',
        } as SearchTracksData,
        {auth: {uid: user.uid}},
      );
      expect(result.items).to.be.a('array');
    });
  });
});
