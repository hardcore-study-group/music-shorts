import _admin from 'firebase-admin';
export const admin =
  process.env.NODE_ENV === 'test'
    ? _admin.initializeApp({
        credential: _admin.credential.cert(
          require('../../../testServiceAccountKey.json'),
        ),
      })
    : _admin.initializeApp({
        serviceAccountId:
          'firebase-adminsdk-7gvq1@music-shorts.iam.gserviceaccount.com',
      });

export * from './auth';
