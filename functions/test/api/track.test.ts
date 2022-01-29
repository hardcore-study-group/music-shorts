import {expect} from 'chai';
import {UserRecord} from 'firebase-admin/lib/auth/user-record';
import {CloudFunction} from 'firebase-functions/v1';
import {clearTestUser, createTestUser} from '../auth.test';
import {testAdmin, testFunctions} from '../setup.test';
import {GetRecommendTracks} from '../../type/api/track';
import {firestore} from 'firebase-admin';

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
          spotifyTrackId: 'test_track_id',
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
            spotifyTrackId: 'test_track_id',
          },
          {auth: user},
        )
        .catch((e: any) => e);
      expect(error).to.be.an('error');
    });

    it('throw error if not admin', async () => {
      const error = await testFunctions
        .wrap(Functions.addTrack)({
          spotifyTrackId: 'test_track_id',
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
    let firstCalledTracks: {id: string}[];

    before(async () => {
      await Promise.all(
        Array(10)
          .fill({
            created_at: firestore.Timestamp.now(),
            called_user_ids: [],
          })
          .map((v: any) => testAdmin.firestore().collection('track').add(v)),
      );
    });

    after(async () => {
      await testAdmin.firestore().collection('guest').doc('random_id').delete();
    });

    it('return max 3 track array', async () => {
      const result = await testFunctions.wrap(Functions.getRecommendTracks)({
        anonymouseId: 'random_id',
      } as GetRecommendTracks);
      firstCalledTracks = result;
      expect(result).to.be.an('array');
      expect(result.length <= 3).to.be.true;
    });

    it('same tracks never show again', async () => {
      const result = await testFunctions.wrap(Functions.getRecommendTracks)({
        anonymouseId: 'random_id',
      } as GetRecommendTracks);
      expect(
        result.filter((v: {id: string}) =>
          firstCalledTracks.map(v => v.id).includes(v.id),
        ).length === 0,
      ).to.be.true;
    });

    it('guest user require argument "anonymouseId"', async () => {
      const result = await testFunctions
        .wrap(Functions.getRecommendTracks)({})
        .catch((e: any) => e);
      expect(result).to.be.a('error');
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
