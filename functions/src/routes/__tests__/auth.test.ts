import {app} from '../..';
import request from 'supertest';

describe('/auth', () => {
  it('/oauthurl/spotify', async () => {
    const res = await request(app).get('/auth/oauthurl/spotify');
    expect(res.text).toContain('https://accounts.spotify.com/authorize');
    expect(res.status).toBe(200);
  });

  it('/token/swap', async () => {
    const res = await request(app)
      .post('/auth/token/swap')
      .send({code: 'code', state: 'admin'});
    expect(JSON.parse(res.text)).toHaveProperty('access_token');
    expect(res.status).toBe(200);
  });

  it('/token/refresh', async () => {
    const res = await request(app)
      .post('/auth/token/refresh')
      .send({refresh_token: 'token'});
    expect(JSON.parse(res.text)).toHaveProperty('access_token');
    expect(res.status).toBe(200);
  });
});
