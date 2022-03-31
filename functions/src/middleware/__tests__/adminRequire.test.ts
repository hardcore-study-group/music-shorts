import {app} from '../..';
import request from 'supertest';
import adminRequire from '../adminRequire';

app.get('/test', adminRequire, (req, res) => {
  res.status(200).send();
});

describe('adminRequire', () => {
  it('403', async () => {
    const res = await request(app)
      .get('/test')
      .set('Authorization', 'Bearer 123123');
    expect(res.status).toBe(403);
  });
  it('200', async () => {
    const res = await request(app)
      .get('/test')
      .set('Authorization', 'Bearer 123456');
    expect(res.status).toBe(200);
  });
});
