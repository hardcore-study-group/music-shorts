import _admin from 'firebase-admin';
export const admin =
  process.env.NODE_ENV === 'test'
    ? _admin.initializeApp({
        credential: _admin.credential.cert(
          require('../../testServiceAccountKey.json'),
        ),
        storageBucket: 'music-shorts-test.appspot.com',
      })
    : process.env.NODE_ENV === 'development'
    ? _admin.initializeApp({
        credential: _admin.credential.cert(
          require('../../serviceAccountKey.json'),
        ),
        storageBucket: 'music-shorts.appspot.com',
      })
    : _admin.initializeApp();
