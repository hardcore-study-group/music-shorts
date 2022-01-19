import {expect} from 'chai';
import {UserRecord} from 'firebase-admin/lib/auth/user-record';
import {CloudFunction} from 'firebase-functions/v1';
import {StartPlayerData} from '../../type/api/player';
import {clearTestUser, createTestUser} from '../auth.test';
import {testAdmin, testFunctions} from '../setup.test';

describe('api/player', () => {
  let Functions: {
    startPlayer: CloudFunction<Promise<any>>;
  };
  let user: UserRecord;
  let mockTrackId: string;

  before(async () => {
    Functions = require('../../src/api/player');
    user = await createTestUser();
    mockTrackId = await testAdmin
      .firestore()
      .collection('user')
      .doc(user.uid)
      .collection('playlist')
      .add({
        track: {
          spotify_id: '5fdNHVZHbWB1AaXk4RBGVD',
        },
      })
      .then(v => v.id);
  });

  after(async () => {
    await clearTestUser();
  });

  context('startPlayer', () => {
    it.skip('play current track on current device', async () => {
      const result = await testFunctions
        .wrap(Functions.startPlayer)(
          {
            deviceId: '123',
            trackId: mockTrackId,
          } as StartPlayerData,
          {auth: user},
        )
        .catch((e: any) => e);
      expect(result).not.to.be.a('error');
    });

    it.skip('throw error when called by unpremiumed spotify account');
  });
});
