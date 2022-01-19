import {expect} from 'chai';
import {UserRecord} from 'firebase-admin/lib/auth/user-record';
import {CloudFunction} from 'firebase-functions/v1';
import {HttpsError} from 'firebase-functions/v1/https';
import {clearTestUser, createTestUser} from '../auth.test';
import {testAdmin, testFunctions} from '../setup.test';

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
    // delete all track data
    const trackDocs = await testAdmin
      .firestore()
      .collection('track')
      .listDocuments();
    await Promise.all(trackDocs.map(v => v.delete()));
  });

  context('addTrack', () => {
    it('create field on track collection', async () => {
      const result = await testFunctions.wrap(Functions.addTrack)(
        {
          spotifyTrackId: '5fdNHVZHbWB1AaXk4RBGVD',
        },
        {auth: user},
      );

      expect(result).to.be.a('object');
      expect(result).to.has.property('id');

      const snapshot = await testAdmin
        .firestore()
        .collection('track')
        .doc(result.id)
        .get();

      expect(snapshot.exists).to.be.true;
    });

    it('throw error if already-exists', async () => {
      const error = await testFunctions
        .wrap(Functions.addTrack)(
          {
            spotifyTrackId: '5fdNHVZHbWB1AaXk4RBGVD',
          },
          {auth: user},
        )
        .catch((e: any) => e);
      expect(error).to.be.an('error');
    });

    it('throw error if not admin', async () => {
      const error = await testFunctions
        .wrap(Functions.addTrack)({
          spotifyTrackId: '5fdNHVZHbWB1AaXk4RBGVD',
        })
        .catch((e: any) => e);
      expect(error).to.be.an('error');
    });

    it('throw error when call with invalid spotifyTrackId', async () => {
      const error = await testFunctions
        .wrap(Functions.addTrack)(
          {
            spotifyTrackId: 'invalid_id',
          },
          {auth: user},
        )
        .catch((e: any) => e);
      expect(error).to.be.an('error');
    });
  });

  context('getRecommendTracks', async () => {
    it('return array tracks when call', async () => {
      const result = await testFunctions.wrap(Functions.getRecommendTracks)({});
      expect(result).to.be.an('array');
    });
  });

  context('getTracks', async () => {
    it('return array tracks when call', async () => {
      const result = await testFunctions.wrap(Functions.getTracks)({
        offset: 0,
        limit: 10,
      });
      expect(result).to.be.an('array');
    });
  });

  context('removeTrack', () => {
    it('remove one track on db', async () => {
      const error = await testFunctions
        .wrap(Functions.getTracks)({
          offset: 0,
          limit: 10,
        })
        .catch((e: any) => e);
      expect(error).to.not.a('error');
    });
  });
});
