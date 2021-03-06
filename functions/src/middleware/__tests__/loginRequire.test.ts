import {app} from '../..';
import request from 'supertest';
import loginRequire from '../loginRequire';

app.get('/test', loginRequire, (req, res) => {
  res.status(200).send(req.type);
});

describe('loginRequire', () => {
  it('without "authorization" header', async () => {
    const res = await request(app).get('/test');
    expect(res.status).toBe(401);
  });
  it('with "authorization" header', async () => {
    const res = await request(app).get('/test').set('Authorization', 'token');
    expect(res.status).toBe(200);
    expect(res.text === 'spotify' || res.text === 'youtube').toBeTruthy();
  });
});
