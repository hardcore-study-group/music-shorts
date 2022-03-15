import {app} from '../..';
import request from 'supertest';

describe('/me', () => {
  it('/', async () => {
    const res = await request(app).get('/me').set('Authorization', 'token');
    expect(JSON.parse(res.text)).toHaveProperty('id');
    expect(res.status).toBe(200);
  });

  describe('playlist/tracks', () => {
    it('/ (GET)', async () => {
      const res = await request(app)
        .get('/me/playlist/tracks')
        .set('Authorization', 'token');
      expect(JSON.parse(res.text)).toHaveProperty('items');
      expect(res.status).toBe(200);
    });

    it('/ (POST)', async () => {
      const res = await request(app)
        .post('/me/playlist/tracks')
        .send({track_id: 'track_id'})
        .set('Authorization', 'token');
      expect(JSON.parse(res.text)).toHaveProperty('snapshot_id');
      expect(res.status).toBe(200);
    });

    it('/ (DELETE)', async () => {
      const res = await request(app)
        .delete('/me/playlist/tracks/track_id')
        .set('Authorization', 'token');
      expect(JSON.parse(res.text)).toHaveProperty('snapshot_id');
      expect(res.status).toBe(200);
    });
  });
});
