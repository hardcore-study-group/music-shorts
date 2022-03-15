import _admin from 'firebase-admin';
export const admin =
  process.env.NODE_ENV === 'test'
    ? _admin.initializeApp({
        credential: _admin.credential.cert(
          require('../../testServiceAccountKey.json'),
        ),
      })
    : _admin.initializeApp();
