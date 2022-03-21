import {app} from '../..';
import request from 'supertest';
import deviceRequire from '../deviceRequire';

app.get('/test', deviceRequire, (req, res) => {
  res.status(200).send(req.device_id);
});

describe('deviceRequire', () => {
  it('without "device_id" header', async () => {
    const res = await request(app).get('/test');
    expect(res.status).toBe(403);
  });
  it('with "device_id" header', async () => {
    const res = await request(app)
      .get('/test')
      .set('device_id', 'test_device_id');
    expect(res.status).toBe(200);
    expect(res.text).toBe('test_device_id');
  });
});
