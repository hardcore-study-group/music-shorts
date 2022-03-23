import {app} from '../..';
import request from 'supertest';

describe('/search', () => {
  it('/spotify', async () => {
    const res = await request(app).get('/search/spotify?q=test_query');
    expect(res.status).toBe(200);
  });
});
