import {app} from '../..';
import request from 'supertest';

describe('/albums', () => {
  it(':id', async () => {
    const res = await request(app)
      .get('/albums/test_id')
      .set('Authorization', 'token');
    expect(JSON.parse(res.text)).toHaveProperty('images');
    expect(res.status).toBe(200);
  });
});
