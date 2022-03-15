import {app} from '../..';
import request from 'supertest';
import adminRequire from '../adminRequire';
import loginRequire from '../loginRequire';
import {admin} from '../../config/firebase';

app.get('/test', loginRequire, adminRequire, (req, res) => {
  res.status(200).send();
});

describe('adminRequire', () => {
  // it('403', async () => {
  //   await admin
  //     .firestore()
  //     .collection('user')
  //     .doc('31se6zrwwpucppd5q7tptxs7xwwq')
  //     .set({
  //       is_admin: false,
  //     });
  //   const res = await request(app).get('/test').set('Authorization', 'token');
  //   expect(res.status).toBe(403);
  // });
  it('200', async () => {
    // set admin
    await admin
      .firestore()
      .collection('user')
      .doc('31se6zrwwpucppd5q7tptxs7xwwq')
      .set({
        is_admin: true,
      });
    const res = await request(app).get('/test').set('Authorization', 'token');
    expect(res.status).toBe(200);
  });
});
