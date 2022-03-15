import {app} from '../..';
import request from 'supertest';
import {admin} from '../../config/firebase';
import {spotify} from '../../config/spotify';

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

  it('/ (POST)', async () => {
    const res = await request(app)
      .post('/tracks')
      .set('Authorization', 'token')
      .send({spotifyTrackId: 'test_id'});

    expect(JSON.parse(res.text)).toHaveProperty('id');
    trackId = JSON.parse(res.text).id;
    expect(res.status).toBe(201);
  });

  it('/:id (DELETE)', async () => {
    const res = await request(app)
      .delete(`/tracks/${trackId}`)
      .set('Authorization', 'token');

    expect(res.status).toBe(204);
  });

  describe('/recommendation', () => {
    it('/', async () => {
      const res = await request(app)
        .get(`/tracks/recommendation`)
        .set('Authorization', 'token');

      expect(res.status).toBe(200);
    });
  });
});
