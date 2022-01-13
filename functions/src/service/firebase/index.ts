import {initializeApp, credential} from 'firebase-admin';

export const admin =
  process.env.NODE_ENV === 'test'
    ? initializeApp({
        credential: credential.cert(
          require('../../../testServiceAccountKey.json'),
        ),
      })
    : initializeApp();

export * from './auth';
