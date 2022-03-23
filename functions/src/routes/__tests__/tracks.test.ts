import {app} from '../..';
import request from 'supertest';
import {admin} from '../../config/firebase';
import {spotify} from '../../config/spotify';
import {firestore} from 'firebase-admin';
import path from 'path';

describe('/tracks', () => {
  let trackId: string;

  beforeAll(async () => {
    // clear database
    const result = await spotify.getTrack('');
    const spotifyTrack = result.body;
    const snapshot = await admin
      .firestore()
      .collection('track')
      .where('spotify_id', '==', spotifyTrack.id)
      .get();

    await Promise.all(snapshot.docs.map(doc => doc.ref.delete()));
  });

  beforeEach(async () => {
    // every track-apis admin require
    await admin
      .firestore()
      .collection('user')
      .doc('31se6zrwwpucppd5q7tptxs7xwwq')
      .set({
        is_admin: true,
      });
  });

  it('/ (GET)', async () => {
    const res = await request(app).get('/tracks').set('Authorization', 'token');
    expect(res.status).toBe(200);
  });
  // folloing test code only can run in "ffmpeg" installed computer
  it('/ (POST)', async () => {
    const res = await request(app)
      .post('/tracks')
      .set('Authorization', 'token')
      .send({
        spotify_id: 'test_id',
        youtube_id: 'ZzbNM2l-AAA',
        start_time: 30,
        end_time: 50,
      });

    expect(res.status).toBe(201);
    expect(JSON.parse(res.text)).toHaveProperty('id');
    expect(JSON.parse(res.text)).toHaveProperty('climax_file_name');
    trackId = JSON.parse(res.text).id;
  }, 10000);

  it('/:id (DELETE)', async () => {
    const res = await request(app)
      .delete(`/tracks/${trackId}`)
      .set('Authorization', 'token');

    expect(res.status).toBe(204);
  });

  describe('/recommendation', () => {
    it('/', async () => {
      // create dummy file to storage
      try {
        await admin
          .storage()
          .bucket()
          .upload(path.join('../../../package.json'), {
            destination: 'climax/temp',
          });
      } catch (error) {
        // exist
      }

      // add over three default data
      for (let i = 0; i < 5; i++) {
        await admin.firestore().collection('track').add({
          data: 'dummy',
          created_at: firestore.Timestamp.now(),
          climax_file_name: 'temp',
        });
      }
      const res = await request(app)
        .get(`/tracks/recommendation`)
        .set('device_id', '123');

      expect(res.status).toBe(200);
      expect(JSON.parse(res.text)[0]).toHaveProperty('climax_url');
    }, 10000);
  });
});
