import {expect} from 'chai';
import {UserRecord} from 'firebase-admin/lib/auth/user-record';
import {CloudFunction} from 'firebase-functions/v1';
import {clearTestUser, createTestUser} from '../auth.test';
import {testAdmin, testFunctions} from '../setup.test';

describe.only('api/playlist', () => {
  let Functions: {
    addPlaylistOneTrack: CloudFunction<Promise<any>>;
    getMyPlaylist: CloudFunction<Promise<any>>;
    removePlaylistOneTrack: CloudFunction<Promise<any>>;
  };
  let user: UserRecord;
  let mockTrackId: string;

  before(async () => {
    Functions = require('../../src/api/playlist');
    await Promise.all([
      createTestUser().then(v => (user = v)),
      testAdmin
        .firestore()
        .collection('track')
        .add({testVal: 'test'})
        .then(v => (mockTrackId = v.id)),
    ]);
  });

  after(async () => {
    await Promise.all([
      clearTestUser(),
      testAdmin.firestore().collection('track').doc(mockTrackId).delete(),
    ]);
  });

  context('addPlaylistOneTrack', () => {
    it('add track on users playlist and return track', async () => {
      const result = await testFunctions.wrap(Functions.addPlaylistOneTrack)(
        {
          trackId: mockTrackId,
        },
        {auth: user},
      );
      expect(result).to.has.property('id');

      const snapshot = await testAdmin
        .firestore()
        .collection('user')
        .doc(user.uid)
        .collection('playlist')
        .doc(result.id)
        .get();

      expect(snapshot.exists).to.be.true;
    });
  });

  context('geyMyPlatlist', () => {
    it('return recent 100 playlist', async () => {
      const result = await testFunctions.wrap(Functions.getMyPlaylist)(
        {},
        {auth: user},
      );
      expect(result).to.be.a('array');
      expect(result.length > 0).to.be.true;
    });
  });

  context('removePlaylistOneTrack', () => {
    it('remove one track', async () => {
      const result = await testFunctions
        .wrap(Functions.getMyPlaylist)({}, {auth: user})
        .catch((e: any) => e);
      expect(result).not.be.a('error');
    });
  });
});
