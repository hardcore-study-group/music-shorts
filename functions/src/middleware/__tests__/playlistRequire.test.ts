import {app} from '../..';
import request from 'supertest';
import loginRequire from '../loginRequire';
import playlistRequire from '../playlistRequire';

app.get('/test', loginRequire, playlistRequire, (req, res) => {
  res.status(200).send(req.playlist_id);
});

describe.only('playlistRequire', () => {
  it('200', async () => {
    const res = await request(app).get('/test').set('Authorization', 'token');
    expect(res.text).toBe('string');
    expect(res.status).toBe(200);
  });
});
