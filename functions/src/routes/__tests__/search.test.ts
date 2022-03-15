import {app} from '../..';
import request from 'supertest';

describe('/search', () => {
  it('/', async () => {
    const res = await request(app)
      .get('/search?q=test_query')
      .set('Authorization', 'token');
    expect(res.status).toBe(200);
  });
});
